from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ContentViewSet, StudyMaterialViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'contents', ContentViewSet, basename='content')
router.register(r'study-materials', StudyMaterialViewSet, basename='study-material')

urlpatterns = [
    path('', include(router.urls)),
]
