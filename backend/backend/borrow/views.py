from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from book.models import Book
from book.serializers import BookSerializer 
from .models import book_borrow
from .serializers import BorrowSerializer , BorrowDetailSerializer
from custom_user.permissions import IsStudent, IsLibrarian, IsAdmin , IsLibrarianOrIsStudent
from custom_user.models import User
from book.models import Book
from book.serializers import BookSerializer
from custom_user.serializers import UserSerializer
from django.conf import settings
from django.core.mail import send_mail
from django.core.paginator import Paginator,EmptyPage

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
        page=request.query_params.get('page',default=1)
        paginator=Paginator(borrows,per_page=10)
        try:
            borrows=paginator.page(number=page)
        except EmptyPage: 
                return Response({
                    'error': 'No borrows found'
                }, status=404)
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

            total_pages= borrows.count()
            total_pages=math.ceil(total_pages/10) 
            page=request.query_params.get('page',default=1)
            paginator=Paginator(borrows,per_page=10)
            try:
                borrows=paginator.page(number=page)
            except EmptyPage: 
                return Response({
                    'error': 'No borrows found'
                }, status=404)

            return Response({
                'borrows': BorrowDetailSerializer(borrows, many=True).data,
                'total_pages':total_pages
            }, status=200)
        except book_borrow.DoesNotExist:
            return Response({"error": "Borrow not found"}, status=status.HTTP_404_NOT_FOUND)
            
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

class MostBorrowedBooks(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian] # IsAdmin not working

    def get(self, request):
        borrows = book_borrow.objects.all()
        books = Book.objects.all()
        book_list = []
        book_list.append(["Book Title", "Borrow Count"])

        
        for book in books:
            count = borrows.filter(book=book, status="confirmed").count()
            # if the book cout is above 0 and the book_list is less than 10 append the book to the list
            if count > 0 and len(book_list) < 6:
                book_list.append([book.title, count])
        # book_list.sort(key=lambda x: x[1], reverse=True)
        return Response(book_list, status=status.HTTP_200_OK)

class MostBorrowingStudents(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def get(self, request):
        borrows = book_borrow.objects.all()
        users = User.objects.filter(role="student")
        user_list = []
        user_list.append(["Student Name", "Borrow Count"])
        for user in users:
            count = borrows.filter(user=user, status="confirmed").count()
            if count > 0 and len(user_list) < 6:
                user_list.append([user.first_name + " " + user.last_name, count])
        return Response(user_list, status=status.HTTP_200_OK)

class BorrowsStatus(APIView):
    permission_classes = [IsAuthenticated, IsLibrarian]

    def get(self, request):
        status_list = []
        status_list.append(["Status", "Count"])

        count_pending = book_borrow.objects.filter(status="pending").count()
        count_confirmed = book_borrow.objects.filter(status="confirmed").count()
        count_cancelled = book_borrow.objects.filter(status="cancelled").count()

        status_list.append(["Pending", count_pending])
        status_list.append(["Confirmed", count_confirmed])
        status_list.append(["Cancelled", count_cancelled])

        return Response(status_list, status=status.HTTP_200_OK)
    
# - most borrowed books by genre
class MostBorrowedBooksByGenre(APIView):
    # changed this line by adding new custom permissions if user is librarian or student in permissions files cus this line doesnt work because there a false return for the first role perm
    # permission_classes=[IsAuthenticated,IsLibrarian,IsStudent]
    permission_classes=[IsAuthenticated,IsLibrarianOrIsStudent]
    def get(self, request):
        genre_list = []
        
        
        
    
#  number of non returned borrows for authenticated student
class NonReturnedBorrows(APIView):
    permission_classes=[IsAuthenticated,IsStudent]
    def get(self, request):
        borrows = book_borrow.objects.filter(user=request.user,status='confirmed',return_date__isnull=True)
        count=borrows.count()
        return Response({
            'count':count
        },status=200)

# - number of my borrows (number w sf)
class MyBorrows(APIView):
    permission_classes=[IsAuthenticated,IsStudent]
    def get(self, request):
        borrows = book_borrow.objects.filter(user=request.user)
        count=borrows.count()
        return Response({
            'count':count
        },status=200)
        
    
# - my borrows status by status by authenticated student
class MyBorrowsStatus(APIView):
    permission_classes=[IsAuthenticated,IsStudent]
    def get(self, request):
        borrows = book_borrow.objects.filter(user=request.user)
        status_list = []
        status_list.append(["Status", "Count"])

        count_pending = borrows.filter(status="pending").count()
        count_confirmed = borrows.filter(status="confirmed").count()
        count_cancelled = borrows.filter(status="cancelled").count()

        status_list.append(["Pending", count_pending])
        status_list.append(["Confirmed", count_confirmed])
        status_list.append(["Cancelled", count_cancelled])

        return Response(status_list, status=status.HTTP_200_OK)