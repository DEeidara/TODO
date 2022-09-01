from rest_framework.serializers import HyperlinkedModelSerializer, ReadOnlyField
from .models import Project, TODONotes


class ProjectModelSerializer(HyperlinkedModelSerializer):
    id = ReadOnlyField()

    class Meta:
        model = Project
        fields = "__all__"


class TODONotesModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODONotes
        fields = "__all__"
