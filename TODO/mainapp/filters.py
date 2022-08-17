from .models import Project, TODONotes
from django_filters import rest_framework as filters


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TODONotesFilter(filters.FilterSet):
    created_at = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = TODONotes
        fields = ["created_at", "project"]
