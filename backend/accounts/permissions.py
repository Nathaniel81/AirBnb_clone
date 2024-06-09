from rest_framework import permissions


class AllowAnonymousGetPermission(permissions.BasePermission):
    """
    Custom permission to allow GET requests for anonymous users.
    """
    def has_permission(self, request, view):
        if view.action == 'list' and request.method == 'GET':
            return True
        return request.user.is_authenticated