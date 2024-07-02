from rest_framework.views import APIView
from .serializers import UserSerializer
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

from .permissions import IsAdmin, IsLibrarian, IsStudent
from django.http import HttpResponse
import pandas as pd
from django.core.paginator import Paginator,EmptyPage
import math

# add isAdmin perm
class register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



class login(APIView):
    # using jwt token generation
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')
        if user is not None:
            refresh=RefreshToken.for_user(user)
            access = refresh.access_token
            return Response({
                'access': str(access),
                'refresh': str(refresh),
                'user': UserSerializer(user).data
            }, status=200)
       
    
class user_infos(APIView):
    permission_classes = [IsAuthenticated,IsStudent]
    def get(self, request):
        user = request.user
        return Response({
            'user': UserSerializer(user).data,
            'role': user.role
        }, status=200)


class logout(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout success'}, status=200)
        except Exception as e:
            return Response({'message': 'Invalid token'}, status=400)
    


class ImportUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def post(self, request):
        # extract the file excem from the request
        try:
            file = request.FILES['file']
            # read the file
            data = pd.read_csv(file)
            # iterate over the rows without the column names
            for i, row in data.iterrows():
                # create a user for each row
                # user = User.objects.create_user(
                #     email=row['email'],
                #     role=row['role'],
                #     first_name=row['first_name'],
                #     last_name=row['last_name'],
                #     password='password'
                # )
                # user.save()
                print(row)
            return Response({'message': 'Users imported successfully'}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        

class ExportUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        users = User.objects.all()
        data = pd.DataFrame(list(users.values())) # convert the queryset to a dataframe using the values() method
        # data.to_csv('users.csv', index=False) 
        # send the file as a response
        response = HttpResponse(data.to_csv(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=users.csv'

        return response
    
class UpdatePassword(APIView):
    permission_classes = [IsAuthenticated]
    # old password, new password, confirm password
    def post(self, request):
        user = request.user
        old_password = request.data['old_password']
        new_password = request.data['new_password']
        # confirm_password = request.data['confirm_password']
        if not user.check_password(old_password):
            return Response({'message': 'Incorrect password'}, status=400)
        # if new_password != confirm_password:
            # return Response({'error': 'Passwords do not match'}, status=400)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=200)

class GetUsers(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        users = User.objects.filter(role__in=['librarian', 'student']).values('id','first_name', 'last_name', 'email', 'role')
        users_count = users.filter(role__in=['librarian', 'student']).count()
        total_pages = math.ceil(users_count/10)

        user = request.query_params.get('user', None)
        role = request.query_params.get('role', None)
        if user:
            user = user.strip()
        if user is not None:
            users = users.filter(first_name__icontains=user) | users.filter(last_name__icontains=user)
        if role:
            users = users.filter(role=role)

        page=request.query_params.get('page',default=1)
        paginator=Paginator(users,per_page=10)

        try:
            users=paginator.page(number=page)
        except EmptyPage: 
                return Response({
                    'error': 'No users found'
                }, status=404)

        return Response({
            'users': UserSerializer(users, many=True).data,
            'total_pages':total_pages
        }, status=200)

class UpdateUserPassword(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def patch(self, request, pk):
        new_password = request.data['new_password']
        user = User.objects.get(id=pk)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=200)

class DeleteUser(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        print(user)
        return Response({'message': 'User deleted successfully'}, status=200)