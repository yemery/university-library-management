from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None or user.check_password(password) is False:
            raise AuthenticationFailed('Invalid credentials!')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60), # expiration time
            'iat': datetime.datetime.utcnow() # the time at which the token was generated
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        # send the token as a response (to be stored in local storage or session storage)
        # return Response({
        #     'message': 'Login successful!',
        #     'jwt': token
        # }, status=200)

        # send the token as a cookie
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token,
            'user': UserSerializer(user).data
        }

        return response

class AccessView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            # raise AuthenticationFailed('Unauthenticated!')
            return Response({'error': 'Unauthenticated!'}, status=401)

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError: # expired token
            # raise AuthenticationFailed('Unauthenticated!')
            return Response({'error': 'Token expired!'}, status=401)

        user_role = User.objects.filter(id=payload['id']).first().role

        return Response({
            'message': 'Access granted!',
            'role': user_role,
        })

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logged out'
        }
        return response