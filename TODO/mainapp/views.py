from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, TODONotes
from .serializers import ProjectModelSerializer, TODONotesModelSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .filters import ProjectFilter, TODONotesFilter


class ProjectPagination(PageNumberPagination):
    page_size = 10


class ProjectModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter


class TODONotesPagination(PageNumberPagination):
    page_size = 20


class TODONotesModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer]
    queryset = TODONotes.objects.all()
    serializer_class = TODONotesModelSerializer
    pagination_class = TODONotesPagination
    filterset_class = TODONotesFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = {"status": TODONotes.COMPLETED}
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
