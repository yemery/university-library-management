from django.urls import path
from .views import *



urlpatterns = [
    path('borrow/', BorrowBook.as_view(), name='borrow'),
    path('borrows/', BorrowList.as_view(), name='borrows'),
    path('borrows/update/<int:pk>/', BorrowList.as_view(), name='update_borrow'),
    path('borrows/user/', OwnBorrowList.as_view(), name='own_borrows'),
    path('borrows/confirm/<int:pk>/', ConfirmBorrow.as_view(), name='confirm_borrow'),
    path('borrows/cancel/<int:pk>/', CancelBorrow.as_view(), name='cancel_borrow'),
    path('borrows/most-borrowed/', MostBorrowedBooks.as_view(), name='most_borrowed_books'),
    path('borrows/most-students/', MostBorrowingStudents.as_view(), name='most_borrowed_students'),
    path('borrows/status/', BorrowsStatus.as_view(), name='most_borrowed_books'),
    path('borrows/most-borrowed-by-genre/', MostBorrowedBooksByGenre.as_view(), name='most_borrowed_books_by_genre'),
    path('borrows/non-returned/', NonReturnedBorrows.as_view(), name='non_returned_books'),
    path('borrows/by-status/', MyBorrowsStatus.as_view(), name='borrow_by_status'),
    path('borrows/borrowed-books/', MyBorrows.as_view(), name='borrowed_books'),
]