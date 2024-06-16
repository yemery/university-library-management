from django.urls import path
from .views import *



urlpatterns = [
    path('borrow/', BorrowBook.as_view(), name='borrow'),
]