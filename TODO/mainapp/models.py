from django.db import models
from usersapp.models import TODOUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    repository_link = models.URLField(blank=True)
    devs_list = models.ManyToManyField(TODOUser)

    def __str__(self):
        return self.name


class TODONotes(models.Model):
    IN_PROGRESS = "IN PROGRESS"
    COMPLETED = "COMPLETED"

    STATUSES = [
        (IN_PROGRESS, "In progress"),
        (COMPLETED, "Completed"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=16, choices=STATUSES, default=IN_PROGRESS)
