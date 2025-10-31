from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ContentViewSet, StudyMaterialViewSet, QuizViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'contents', ContentViewSet, basename='content')
router.register(r'study-materials', StudyMaterialViewSet, basename='study-material')
router.register(r'quizzes', QuizViewSet, basename='quiz')

urlpatterns = [
    path('', include(router.urls)),
]
