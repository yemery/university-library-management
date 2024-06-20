
from rest_framework import serializers
from .models import book_borrow as Borrow
from custom_user.serializers import UserSerializer
from book.serializers import BookSerializer
class BorrowSerializer(serializers.ModelSerializer):
    # get the user and book full information as well
    # book=BookSerializer()
    # user=UserSerializer()
    class Meta:
        model = Borrow
        fields = '__all__'
