
from rest_framework import serializers
from .models import book_borrow as Borrow
from custom_user.serializers import UserSerializer
from book.serializers import BookSerializer
import datetime
from book.models import Book
from custom_user.models import User
class BorrowSerializer(serializers.ModelSerializer):
    
    # get the user and book full information as well
    # book = BookSerializer()
    # user = UserSerializer()
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Borrow
        fields = '__all__'

# add the details of book and user in the borrow list
class BorrowDetailSerializer(serializers.ModelSerializer):
    # return details of book and user not only their id with object of book and user
    
    book = BookSerializer()  
    user = UserSerializer()  
    
    class Meta:
        model = Borrow
        fields = '__all__'