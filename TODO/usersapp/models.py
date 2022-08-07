from django.db import models
from django.contrib.auth.models import AbstractUser


class TODOUser(AbstractUser):
    email = models.EmailField(blank=True, unique=True)
