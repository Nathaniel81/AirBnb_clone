from rest_framework import permissions


class AllowAnonymousGetPermission(permissions.BasePermission):
    """
    Custom permission to allow GET requests for anonymous users.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user and request.user.is_authenticated
