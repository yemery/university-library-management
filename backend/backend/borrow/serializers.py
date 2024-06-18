
from rest_framework import serializers
from .models import book_borrow as Borrow

class BorrowSerializer(serializers.ModelSerializer):
    # get the user and book full information as well
    class Meta:
        model = Borrow
        fields = '__all__'
