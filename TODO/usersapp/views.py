from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TODOUser
from .serializers import TODOUserModelSerializer


class TODOUserModelViewSet(ModelViewSet):
    queryset = TODOUser.objects.all()
    serializer_class = TODOUserModelSerializer
