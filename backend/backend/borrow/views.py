from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from book.models import Book
from book.serializers import BookSerializer
from .models import book_borrow
from .serializers import BorrowSerializer
from custom_user.permissions import IsStudent
# Create your views here.


#add borrow book
class BorrowBook(APIView):
    permission_classes = [IsAuthenticated, IsStudent]
    def post(self, request):
        #check if the book is available
        try:
            book=Book.objects.get(id=request.data['book_id'])
            if book.is_available == True:
                serializer = BorrowSerializer(data={'book_id':request.data['book_id'],'user_id':request.user.id})
                if serializer.is_valid():
                    # trigger an email to the student to confirm the borrow
                    # serializer.save()
                    # book.is_available=False
                    # book.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({
                'error': 'Book is not available'
            }, status=status.HTTP_400_BAD_REQUEST)
       
        except Book.DoesNotExist:
            return Response({
                'error': 'Book does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
       
     
        
       
