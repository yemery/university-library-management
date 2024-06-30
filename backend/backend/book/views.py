from django.shortcuts import render
from custom_user.permissions import IsAdmin, IsLibrarian, IsStudent
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer
import math
from django.core.paginator import Paginator,EmptyPage
@permission_classes([IsAuthenticated])
class BooksList(APIView):
    def get(self, request):
        try:
            books = Book.objects.all().order_by('-created_at')
            # total pages for the paginator in the frontend
            total_pages=books.count()
            # if number is float we need to ceil it to the next number
            total_pages=math.ceil(total_pages/10) 
            # print(total_pages)
            # search by title or author or status 
            title=request.query_params.get('title',default=None)
            author=request.query_params.get('author',default=None)
            status=request.query_params.get('status',default=None)
            # filter could be multiple values
            # request example http://api/books/?title=book1&title=book2&author=author1
            if title is not None:
                books=books.filter(title__icontains=title)
            if author is not None:
                books=books.filter(author__icontains=author)
            if status is not None:
                books=books.filter(is_available__icontains=status)
                
            
        
            # perpage by default is 10 no need to gve user to change it
            # perpage=request.query_params.get('perpage',default=1)
            page=request.query_params.get('page',default=1)
            # calling the paginator in url example http://api/books/?perpage=5&page=2
            # well add only the page in the url example http://api/books/?page=2
            paginator=Paginator(books,per_page=10)
            try:
                books=paginator.page(number=page)
            except EmptyPage: 
                return Response({
                    'error': 'No books found'
                }, status=404)
            # return list of objects 
            return Response({
                'books': BookSerializer(books,many=True).data,
                'total_pages':total_pages
            }, status=200)

        except Book.DoesNotExist : 
            return Response({
                'error': 'No books found'
            }, status=404)

@permission_classes([IsAuthenticated])
class BookDetail(APIView):
    def get(self, request, pk):
        try:
            book= Book.objects.get(id=pk)
            return Response({
                'book': BookSerializer(book).data
            }, status=200)
        except Book.DoesNotExist:
            return Response({
                'error': 'Book does not exist'
            }, status=404)

@permission_classes([IsLibrarian])
class CreateBook(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@permission_classes([IsLibrarian])
class UpdateBook(APIView):
    def patch(self, request, pk):
        try:
            book = Book.objects.get(id=pk)
            serializer = BookSerializer(book, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)
        except Book.DoesNotExist:
            return Response({
                'error': 'Book does not exist'
            }, status=404)


@permission_classes([IsLibrarian])
class DeleteBook(APIView):
    def delete(self, request, pk):
        try:
            book = Book.objects.get(id=pk)
            book.delete()
            return Response({
                'message': 'Book deleted successfully'
            }, status=204)
        except Book.DoesNotExist:
            return Response({
                'error': 'Book does not exist'
            }, status=404)

@permission_classes([IsLibrarian])
class BookAvailabilityStat(APIView):
    def get(self, request):
        availability_list = []
        availability_list.append(["Availability", "Count"])

        count_available = Book.objects.filter(is_available=True).count()
        count_borrowed = Book.objects.filter(is_available=False).count()

        availability_list.append(["Available", count_available])
        availability_list.append(["Borrowed", count_borrowed])

        return Response(availability_list, status=200)

        