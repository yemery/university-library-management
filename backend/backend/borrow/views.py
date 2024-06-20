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
from django.conf import settings
from django.core.mail import send_mail

# Create your views here.


# add borrow book
class BorrowBook(APIView):
    permission_classes = [IsAuthenticated, IsStudent]

    def post(self, request):
        # check if the book is available
        try:
            book = Book.objects.get(id=request.data["book"])            
            if book.is_available:
                serializer = BorrowSerializer(
                    data={
                        "book": book,
                        "user": request.user,
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
                {"error": "Book is not available",
                    "book": BookSerializer(book).data}, status=status.HTTP_400_BAD_REQUEST
            )

        except Book.DoesNotExist:
            return Response(
                {"error": "Book does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class BorrowList(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def get(self, request):
        try:
            borrows = book_borrow.objects.select_related('book', 'user').all()
            serializer = BorrowSerializer(borrows, many=True)

            #def get(self, request, *args, **kwargs):
        # queryset = YourModel.objects.select_related('related_field1', 'related_field2').all()
        # serializer = YourModelSerializer(queryset, many=True)
        # return Response(serializer.data)

            # book = Book.objects.filter(id=request.book)
            # user = User.objects.filter(id=request.user)

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
            borrows = book_borrow.objects.filter(user=request.user.id)
            # print(borrows[0].book.title)
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