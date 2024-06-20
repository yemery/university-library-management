from django.db import models
from book.models import Book
from django.conf import settings
# Create your models here.

class book_borrow(models.Model):
    STATUS = [
        ("pending", "pending"),
        ("confirmed", "confirmed"),
        ('cancelled', 'cancelled')
    ]
    # might change this as previouslty with 2 options
    

    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(null=True)
    return_date = models.DateTimeField(null=True)
    status = models.CharField(max_length=20, choices=STATUS, default="pending")
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    # def __str__(self):
    #     return self.book