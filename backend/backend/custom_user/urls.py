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
    path('import-users/', ImportUsers.as_view()),
    path('export-users/', ExportUsers.as_view()),
    path('update-pwd/', UpdatePassword.as_view()),
    path('users-info/', GetUsers.as_view()),
    
]