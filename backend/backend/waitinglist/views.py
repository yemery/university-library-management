from django.shortcuts import render
from .serializers import WaitingListSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from custom_user.permissions import IsStudent
from rest_framework.permissions import IsAuthenticated
from book.models import Book
from django.core.mail import send_mail
from django.conf import settings
class WaitListBook(APIView):
    permission_classes = [IsAuthenticated,IsStudent]

    def post(self, request):
        try:
            book = Book.objects.get(id=request.data['book'])
        except:
            return Response({"error":"Book not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        user=request.user
        data = {'book':book.id,'user':user.id}
        serializer = WaitingListSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            send_mail(
                'Book added to waiting list',
                'You have been added to the waiting list for the book '+book.title,
                settings.EMAIL_HOST_USER,
                [request.user.email],
               
                fail_silently=False
                
            )
                
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)