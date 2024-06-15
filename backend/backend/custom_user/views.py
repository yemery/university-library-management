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

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    pass
#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.filter(email=email).first()

#         if user is None or user.check_password(password) is False:
#             raise AuthenticationFailed('Invalid credentials!')
        
#         # payload = {
#         #     'id': user.id,
#         #     'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60), # expiration time
#         #     'iat': datetime.datetime.utcnow() # the time at which the token was generated
#         # }

#         # token = jwt.encode(payload, 'secret', algorithm='HS256')

#         # send the token as a response (to be stored in local storage or session storage)
#         # return Response({
#         #     'message': 'Login successful!',
#         #     'jwt': token
#         # }, status=200)

#         # send the token as a cookie
#         response = Response()
#         response.set_cookie(key='jwt', value=token, httponly=True)
#         response.data = {
#             'jwt': token,
#             'user': UserSerializer(user).data
#         }

        # return response

class AccessView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        token = request.headers['Authorization']
        try:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            
            # Decode the token
            decoded_payload = jwt.decode(token, 'SECRET_KEY', algorithms=["HS256"])

            user = User.objects.get(id=decoded_payload['user_id'])
        
        except jwt.ExpiredSignatureError:
            raise InvalidToken("The token has expired.")
        except jwt.DecodeError:
            raise InvalidToken("Error decoding token.")
        except jwt.InvalidTokenError:
            raise InvalidToken("Invalid token.")
        
        return Response({
            'message': 'Access granted!',
            'token': request.headers['Authorization'],
            'info': UserSerializer(user).data
        })

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logged out'
        }
        return response