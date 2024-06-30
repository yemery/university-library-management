from django.urls import path
from .views import *

urlpatterns= [
    path('books/', BooksList.as_view()),
    path('books/<int:pk>/', BookDetail.as_view()),
    path('books/create/', CreateBook.as_view()),
    path('books/update/<int:pk>/', UpdateBook.as_view()),
    path('books/delete/<int:pk>/', DeleteBook.as_view()),
    path('books/availability/', BookAvailabilityStat.as_view()),
]