from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from .models import Project, TODONotes
from .serializers import ProjectModelSerializer, TODONotesModelSerializer


class ProjectModelViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TODONotesModelViewSet(ModelViewSet):
    queryset = TODONotes.objects.all()
    serializer_class = TODONotesModelSerializer
