from django.urls import path
from .views import *

urlpatterns = [
    path('waiting-list/', WaitListBook.as_view(), name='waitinglist'),
]