from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from .models import TODOUser
from .serializers import TODOUserModelSerializer
from rest_framework import mixins
from rest_framework.permissions import BasePermission


# class StaffOnly(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_staff


class TODOUserCustomViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    # permission_classes = [StaffOnly]
    queryset = TODOUser.objects.all()
    serializer_class = TODOUserModelSerializer
