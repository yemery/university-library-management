import factory
from faker import Faker
from .models import Book


faker=Faker()
class BookFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Book

    title = factory.Faker('sentence', nb_words=4)
    author = factory.Faker('name')
    description = factory.Faker('text')
    is_available = True
    created_at = factory.Faker('date_time_this_year')
    updated_at = factory.Faker('date_time_this_year')
    
    # run faker to generate random data by calling the factory function in the shell 
    # factory = BookFactory()