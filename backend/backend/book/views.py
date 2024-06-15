from django.shortcuts import render
from custom_user.permissions import IsAdmin, IsLibrarian, IsStudent
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Book
from .serializers import BookSerializer

@permission_classes([IsAuthenticated])
class BooksList(APIView):
    def get(self, request):
        try:
            books = Book.objects.all()
            return Response({
                'books': BookSerializer(books, many=True).data
            }, status=200)
        except Book.DoesNotExist:
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