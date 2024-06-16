from django.db import models
from book.models import Book
from django.conf import settings
# Create your models here.

class book_borrow(models.Model):
    book_id = models.ForeignKey(Book, on_delete=models.CASCADE)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(auto_now_add=True,null=True)
    return_date = models.DateTimeField(null=True)
    is_confirmed = models.BooleanField(default=False)
    def __str__(self):
        return self.book_id