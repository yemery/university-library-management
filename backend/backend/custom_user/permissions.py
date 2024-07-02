from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'admin':
            return True
        else:
            return False

class IsLibrarian(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'librarian':
            return True
        else:
            return False
        
class IsStudent(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'student':
            return True
        else:
            return False
        
class IsLibrarianOrIsStudent(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'librarian' or request.user.role == 'student':
            return True
        return False

class IsAdminOrIsLibrarian(BasePermission):
    def has_permission(self, request, view):
        if request.user.role == 'admin' or request.user.role == 'librarian':
            return True
        return False