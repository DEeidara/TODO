from usersapp.models import TODOUser
from django.core.management import BaseCommand
from mainapp.models import TODONotes, Project
from decouple import config


class Command(BaseCommand):
    def handle(self, *args, **options):
        user = TODOUser.objects.filter(username=config("DB_USER")).first()
        if not user:
            TODOUser.objects.create_superuser(
                username=config("DB_USER"),
                password=config("DB_PASSWORD"),
            )
            project = Project.objects.create(
                name="test", repository_link="https://test.com"
            )

            TODONotes.objects.create(project=project, text="test")
