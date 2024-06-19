from django.urls import path
from .views import *



urlpatterns = [
    path('borrow/', BorrowBook.as_view(), name='borrow'),
    path('borrows/', BorrowList.as_view(), name='borrows'),
    path('borrows/update/<int:pk>/', BorrowList.as_view(), name='update_borrow'),
    path('borrows/user/', OwnBorrowList.as_view(), name='own_borrows'),
    path('borrows/confirm/<int:pk>/', ConfirmBorrow.as_view(), name='confirm_borrow'),
    path('borrows/cancel/<int:pk>/', CancelBorrow.as_view(), name='cancel_borrow'),

]