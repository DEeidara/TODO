from rest_framework.serializers import ModelSerializer
from .models import Project, TODONotes


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class TODONotesModelSerializer(ModelSerializer):
    class Meta:
        model = TODONotes
        fields = "__all__"
