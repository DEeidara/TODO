from django.test import TestCase
from rest_framework import status
from rest_framework.test import (
    APIRequestFactory,
    APIClient,
    APISimpleTestCase,
    APITestCase,
    force_authenticate,
)
from mixer.backend.django import mixer
from usersapp.models import TODOUser
from .views import TODONotesModelViewSet
from .models import TODONotes, Project


class TestTODOViewSet(TestCase):
    def setUp(self):
        self.url = "/api/TODO/"

    def test_get_list_factory(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = TODONotesModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_factory(self):
        factory = APIRequestFactory()
        request = factory.post(
            self.url, {"username": "asd", "password": "asdasdasd"}, format="json"
        )
        view = TODONotesModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_client(self):
        note = mixer.blend(TODONotes)
        client = APIClient()
        response = client.get(f"/api/TODO/{note.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestMath(APISimpleTestCase):
    def test_multiplying(self):
        self.assertEqual(52 * 48, 2496)

    def test_sqrt(self):
        import math

        self.assertEqual(math.sqrt(4), 2)


class TestProjectViewSet(APITestCase):
    def setUp(self):
        self.url = "/api/projects/"
        self.login = "admin"
        self.password = "adminadmin"
        self.admin = TODOUser.objects.create_superuser(
            username=self.login, password=self.password
        )

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_project_by_admin(self):
        project = mixer.blend(Project)
        self.client.login(username=self.login, password=self.password)
        response = self.client.put(
            f"{self.url}{project.id}/",
            {"name": "some name", "devs_list": ["/api/users/1/"]},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, "some name")
