from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from book.models import Book
from book.serializers import BookSerializer 
from .models import book_borrow
from .serializers import BorrowSerializer , BorrowDetailSerializer
from custom_user.permissions import IsStudent, IsLibrarian
from custom_user.models import User
from book.models import Book
from book.serializers import BookSerializer
from custom_user.serializers import UserSerializer
from django.conf import settings
from django.core.mail import send_mail

# Create your views here.

import math
# add borrow book
class BorrowBook(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        try:
            book = Book.objects.get(id=request.data["book"])
            if book.is_available:
                data = {
                    "book": book.id,
                    "user": request.user.id,
                }
                serializer = BorrowSerializer(data=data)
                
                if serializer.is_valid():
                    serializer.save()

                    # update the book availability
                    book.is_available = False  
                    book.save()

                    send_mail(
                        "Borrow Confirmation",
                        "Your borrow request is pending. Please come to the library to confirm your borrow. Otherwise, your borrow will be cancelled in 24 hours. Best regards! l idara",
                        settings.EMAIL_HOST_USER,
                        [request.user.email],
                        fail_silently=False,
                    )
                    
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Book is not available", "book": BookSerializer(book).data}, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"error": "Book does not exist"}, status=status.HTTP_404_NOT_FOUND)


class BorrowList(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def get(self, request):
        
        borrows = book_borrow.objects.all().order_by('-created_at')
        total_pages= borrows.count()
            # if number is float we need to ceil it to the next number
        total_pages=math.ceil(total_pages/10) 
        print(total_pages)
        title = request.query_params.get('title', None)
        if title:
            title = title.strip()
        status = request.query_params.get('status', None)
        user = request.query_params.get('user', None)
        if user:
            user = user.strip()
        
        if status is not None:
            borrows = borrows.filter(status=status)
        if user is not None:
            # check if firstname and last name contains user input
            borrows = borrows.filter(user__first_name__icontains=user) | borrows.filter(user__last_name__icontains=user)
        if title is not None:
            borrows = borrows.filter(book__title__icontains=title)
        
        # using the new serializer 
        # serializer = BorrowDetailSerializer(borrows, many=True)
        return Response({
                'borrows': BorrowDetailSerializer(borrows, many=True).data,
                'total_pages':total_pages
            }, status=200)

    def patch(self, request, pk):
        try:
            borrow = book_borrow.objects.get(id=pk)
            serializer = BorrowSerializer(borrow, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except book_borrow.DoesNotExist:
            return Response({"error": "Borrow not found"}, status=status.HTTP_404_NOT_FOUND)



class OwnBorrowList(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        try:
            borrows = book_borrow.objects.filter(user=request.user.id)
            # print(borrows[0].book.title)
            serializer = BorrowDetailSerializer(borrows, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except book_borrow.DoesNotExist:
            return Response(
                {"error": "No borrows found"}, status=status.HTTP_404_NOT_FOUND
            )


class ConfirmBorrow(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def patch(self, request, pk):
        try:
            borrow = book_borrow.objects.get(id=pk)
            serializer = BorrowSerializer(
                borrow, data={"status": "confirmed"}, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                book = Book.objects.get(id=borrow.book.id)
                book.is_available = False
                book.save()
                return Response(
                    {
                        "message": "Borrow confirmed",
                        "book": BookSerializer(book).data,
                        "borrow": BorrowSerializer(borrow).data,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except book_borrow.DoesNotExist:
            return Response(
                {"error": "Borrow not found"}, status=status.HTTP_404_NOT_FOUND
            )

class CancelBorrow(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def patch(self, request, pk):
        try:
            borrow = book_borrow.objects.get(id=pk)
            serializer = BorrowSerializer(
                borrow, data={"status": "cancelled"}, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                book = Book.objects.get(id=borrow.book.id)
                book.is_available = True
                book.save()
                return Response(
                    {
                        "message": "Borrow cancelled",
                        "book": BookSerializer(book).data,
                        "borrow": BorrowSerializer(borrow).data,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except book_borrow.DoesNotExist:
            return Response(
                {"error": "Borrow not found"}, status=status.HTTP_404_NOT_FOUND
            )