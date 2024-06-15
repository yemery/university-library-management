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
    


