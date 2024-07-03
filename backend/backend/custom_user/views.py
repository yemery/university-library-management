from rest_framework.views import APIView
from .serializers import UserSerializer, ExportUserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from rest_framework.permissions import IsAuthenticated
import jwt, datetime
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings

from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .permissions import IsAdmin, IsLibrarian, IsStudent
from django.http import HttpResponse
import pandas as pd
from django.core.paginator import Paginator, EmptyPage
import math
from django.conf import settings


class register(APIView):
    # for testing
    # permission_classes = [IsAuthenticated, IsAdmin]
    # been fixed by replacing fields by only attributes we wanna send instead of putting __all__
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('serializer data', serializer.data)
            return Response(serializer.data, status=201)
            # return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class login(APIView):
    # using jwt token generation
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        user = User.objects.filter(email=email).first()
        if user is None:
            return Response({"message": "User not found"}, status=404)
        if not user.check_password(password):
            return Response({"message": "Invalid credentials"}, status=401)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response(
                {
                    "access": str(access),
                    "refresh": str(refresh),
                    "user": UserSerializer(user).data,
                },
                status=200,
            )


# class user_infos(APIView):
#     permission_classes = [IsAuthenticated, IsStudent]

#     def get(self, request):
#         user = request.user
#         return Response(
#             {"user": UserSerializer(user).data, "role": user.role}, status=200
#         )


class logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout success"}, status=200)
        except Exception as e:
            return Response({"message": "Invalid token"}, status=400)


class ImportUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        # extract the file excem from the request
        try:
            file = request.FILES["file"]
            # read the file as csv
            data = pd.read_csv(file, delimiter=";")
            # the error here is was by observing the wway data been returned so i added this
            data = pd.DataFrame(data)  # dataframe is for framing
            count = 0
            # count total nuumber of line in file
            # nb_lines = len(data)
            for i, row in data.iterrows():
                # print(row['email'])
                if User.objects.filter(email=row["email"]).exists():
                    continue
                user = User.objects.create_user(
                    email=row["email"],
                    first_name=row["first_name"],
                    last_name=row["last_name"],
                    role=row["role"],
                    password=row["password"],
                )
                user.save()

                count += 1

            return Response(
                {
                    "count": count,
                    "length": len(data),
                },
                status=201,
            )

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=400)


class ExportUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        users = User.objects.all()

        role = request.query_params.get("role", None)
        if role:
            if role == "all":
                users = User.objects.all()
            else:
                users = User.objects.filter(role=role)
            
        users = ExportUserSerializer(users, many=True).data
        
        data = pd.DataFrame(
            list(users)
        ) # convert the queryset to a dataframe using the values() method
        # data.to_csv('users.csv', index=False)
        # send the file as a response
        response = HttpResponse(data.to_csv(index=False), content_type="text/csv")
        response["Content-Disposition"] = "attachment; filename=users.csv"

        return response


class UpdatePassword(APIView):
    permission_classes = [IsAuthenticated]

    # old password, new password, confirm password
    def post(self, request):
        user = request.user
        old_password = request.data["old_password"]
        new_password = request.data["new_password"]
        # confirm_password = request.data['confirm_password']
        if not user.check_password(old_password):
            return Response({"message": "Incorrect password"}, status=400)
        # if new_password != confirm_password:
        # return Response({'error': 'Passwords do not match'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password updated successfully"}, status=200)


class GetUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        # users = User.objects.filter(role__in=["librarian", "student"]).values(
        #     "id", "first_name", "last_name", "email", "role"
        # )
        # users_count = users.filter(role__in=["librarian", "student"]).count()
        users = User.objects.filter(role__in=["librarian", "student"]).order_by(
            "-date_joined"
        )
        total_pages = math.ceil(users.count() / 10)

        # we will get all users for /get-users/ endpoint
        # then if the user choosed to filter by role in the form of export users
        # we will only get the filter value that will we either libriran or student directly from the query params
        # i suggest having new endpoint for export cus its has its data
        user = request.query_params.get("user", None)
        role = request.query_params.get("role", None)
        if user:
            user = user.strip()
        if user is not None:
            # filter by or without
            users = users.filter(first_name__icontains=user) | users.filter(
                last_name__icontains=user
            )
        if role:
            users = users.filter(role=role)

        # removed thses cus also getting users wasnt working
        page = request.query_params.get("page", default=1)
        paginator = Paginator(users, per_page=10)

        try:
            users = paginator.page(number=page)
        except EmptyPage:
            return Response({"error": "No users found"}, status=404)

        return Response(
            {
                "users": UserSerializer(users, many=True).data,
                "total_pages": total_pages,
            },
            status=200,
        )


class UpdateUserPassword(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def patch(self, request, pk):
        new_password = request.data["new_password"]
        user = User.objects.get(id=pk)
        user.set_password(new_password)
        user.save()
        send_mail(
            "Password Updated",
            f"Your password has been updated to {new_password}",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        return Response({"message": "Password updated successfully"}, status=200)


class DeleteUser(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def delete(self, request, pk):
        user = User.objects.filter(id=pk).first()
        user.delete()
        return Response({"message": "User deleted successfully"}, status=200)


class GetUser(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = User.objects.filter(id=pk).first()
        return Response(UserSerializer(user).data, status=200)
