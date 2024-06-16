from django.db import models


# Create your models here.
class Book(models.Model):
    available = CHOICES = (("available", 1), ("not available", 0))
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    description = models.TextField()
    gender = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
