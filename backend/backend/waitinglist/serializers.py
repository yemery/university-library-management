from rest_framework import serializers
from .models import WaitingList

from book.models import Book
from custom_user.models import User


class WaitingListSerializer(serializers.ModelSerializer):

    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = WaitingList
        fields = "__all__"
