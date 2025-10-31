from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ContentViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'contents', ContentViewSet, basename='content')

urlpatterns = [
    path('', include(router.urls)),
]
