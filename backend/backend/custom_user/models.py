from django_use_email_as_username.models import BaseUser, BaseUserManager
from django.db import models

class User(BaseUser):
    ROLE_CHOICES = [
        ("admin", "admin"),
        ("student", "student"),
        ("librarian", "librarian"),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    objects = BaseUserManager()

    # def __str__(self):
    #     return self.email