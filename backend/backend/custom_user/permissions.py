# from rest_framework.permissions import BasePermission
# from .views import authenticate_user

# class IsAdmin(BasePermission):
#     def has_permission(self, request, view):
#         user = authenticate_user(request)
#         return user.role == 'admin'

# class IsLibrarian(BasePermission):
#     def has_permission(self, request, view):
#         user = authenticate_user(request)
#         return user.role == 'librarian'

# class IsStudent(BasePermission):
#     def has_permission(self, request, view):
#         user = authenticate_user(request)
#         return user.role == 'student'
