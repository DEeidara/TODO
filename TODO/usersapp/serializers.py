from rest_framework.serializers import HyperlinkedModelSerializer
from .models import TODOUser


class TODOUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODOUser
        fields = ("username", "first_name", "last_name", "email")
