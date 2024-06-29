import factory
from faker import Faker
from .models import User


faker=Faker()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Faker('email')
    role = "student"
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    password = factory.Faker('password')
    created_at = factory.Faker('date_time')
    updated_at = factory.Faker('date_time')
   