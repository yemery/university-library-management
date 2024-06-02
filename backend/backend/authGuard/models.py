from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin


# Create your models here.
class User(AbstractUser,PermissionsMixin):
    ROLE_CHOICES = [
        ("admin", "admin"),
        ("student", "student"),
        ("librarian", "librarian"),
    ]

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    role= models.CharField(max_length=100, choices=ROLE_CHOICES, default="student")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    def __str__(self):
        return self.email
