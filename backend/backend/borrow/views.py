from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from book.models import Book
from book.serializers import BookSerializer
from .models import book_borrow
from .serializers import BorrowSerializer
from custom_user.permissions import IsStudent, IsLibrarian
from custom_user.models import User
from book.models import Book
from book.serializers import BookSerializer
from custom_user.serializers import UserSerializer

# Create your views here.

from django.conf import settings
from django.core.mail import send_mail


# add borrow book
class BorrowBook(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        # check if the book is available
        try:
            book = Book.objects.get(id=request.data["book_id"])
            if book.is_available == True:
                serializer = BorrowSerializer(
                    data={
                        "book_id": request.data["book_id"],
                        "user_id": request.user.id,
                    }
                )
                if serializer.is_valid():
                    serializer.save()
                    # trigger an email to the student to confirm the borrow
                    # replace the email with the student email authenticated
                    send_mail(
                        # subject and body for borow confirmation
                        "Borrow Confirmation",
                        "Your borrow request is pending , please  come to the library to confirm your borrow, otherwise your borrow will be cancelled in 24 hours. Best regards! l idara",
                        # well add later celery for this automated update task to change the status of the borrow to cancelled after 24 hours without the student s confirmation
                        settings.EMAIL_HOST_USER,
                        [request.user.email],
                        fail_silently=False,
                    )

                    return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(
                {"error": "Book is not available"}, status=status.HTTP_400_BAD_REQUEST
            )

        except Book.DoesNotExist:
            return Response(
                {"error": "Book does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class BorrowList(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def get(self, request):
        try:
            borrows = book_borrow.objects.all()
            serializer = BorrowSerializer(borrows, many=True)

            # book = Book.objects.filter(id=request.book_id)
            # user = User.objects.filter(id=request.user_id)

            # book = BookSerializer(book)
            # user = UserSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)
            # return Response({
            #     'borrows': serializer.data,
            #     'book': book.data,
            #     'user': user.data
            # }, status=status.HTTP_200_OK)
        except book_borrow.DoesNotExist:
            return Response(
                {"error": "No borrows found"}, status=status.HTTP_404_NOT_FOUND
            )

    def patch(self, request, pk):
        try:
            borrow = book_borrow.objects.get(id=pk)
            serializer = BorrowSerializer(borrow, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except book_borrow.DoesNotExist:
            return Response(
                {"error": "Borrow not found"}, status=status.HTTP_404_NOT_FOUND
            )


class OwnBorrowList(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def get(self, request):
        try:
            borrows = book_borrow.objects.filter(user_id=request.user.id)
            serializer = BorrowSerializer(borrows, many=True)
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
                book = Book.objects.get(id=borrow.book_id.id)
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
                book = Book.objects.get(id=borrow.book_id.id)
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