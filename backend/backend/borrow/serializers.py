
from rest_framework import serializers
from .models import book_borrow as Borrow

class BorrowSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Borrow
        fields = '__all__'
