from .models import Book
from rest_framework import serializers

class BookSerializer(serializers.ModelSerializer):
    is_available = serializers.BooleanField(default=True)
    # search_fields = ['title', 'author', 'status']
    
    class Meta:
        model = Book
        fields = '__all__'
        