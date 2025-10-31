from django.contrib import admin
from django.contrib.auth import get_user_model

# Import Content from the content app where it's defined
from content.models import Content

User = get_user_model()

# Register the custom User model and other models
admin.site.register(User)
admin.site.register(Content)
