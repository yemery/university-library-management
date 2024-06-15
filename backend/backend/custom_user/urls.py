from django.urls import path
from .views import *

urlpatterns=[
    # path('register/', RegisterView.as_view()),
    # path('login/', LoginView.as_view()),
    # path('access/', AccessView.as_view()),
    # path('logout/', LogoutView.as_view()),
    path('register/', register.as_view()),
    path('login/', login.as_view()),
    path('user-infos/', user_infos.as_view()),
    path('logout-user/', logout.as_view()),
    
]