from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import TODOUser


@admin.register(TODOUser)
class TODOUserAdmin(UserAdmin):
    pass
