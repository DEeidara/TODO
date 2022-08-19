from rest_framework.serializers import HyperlinkedModelSerializer, ReadOnlyField
from .models import Project, TODONotes
from usersapp.models import TODOUser


class DevsListSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODOUser
        fields = ["url", "username"]


class ProjectModelSerializer(HyperlinkedModelSerializer):
    devs_list = DevsListSerializer(many=True)
    id = ReadOnlyField()

    class Meta:
        model = Project
        fields = "__all__"


class ProjectTODONotesModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ["name", "id"]


class TODONotesModelSerializer(HyperlinkedModelSerializer):
    project = ProjectTODONotesModelSerializer()

    class Meta:
        model = TODONotes
        fields = "__all__"
