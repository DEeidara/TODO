from rest_framework.serializers import ModelSerializer
from .models import TODOUser


class TODOUserModelSerializer(ModelSerializer):
    class Meta:
        model = TODOUser
        fields = ("id", "username", "first_name", "last_name", "email")


class TODOUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = TODOUser
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "is_staff",
            "is_superuser",
        )
