from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet
from .models import TODOUser
from .serializers import TODOUserModelSerializer
from rest_framework import mixins


class TODOUserCustomViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    queryset = TODOUser.objects.all()
    serializer_class = TODOUserModelSerializer
