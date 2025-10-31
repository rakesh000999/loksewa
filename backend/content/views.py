from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import Category, Content, StudyMaterial
from .serializers import CategorySerializer, ContentSerializer, StudyMaterialSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudyMaterialViewSet(viewsets.ModelViewSet):
    serializer_class = StudyMaterialSerializer
    permission_classes = [permissions.AllowAny]  # Allow anonymous access to all endpoints

    def get_queryset(self):
        # Regular users (and anonymous) can only see published materials
        if not self.request.user.is_staff:
            return StudyMaterial.objects.filter(is_published=True)
        # Staff can see all materials
        return StudyMaterial.objects.all()

    @action(detail=True, methods=['post'])
    def record_download(self, request, pk=None):
        study_material = self.get_object()
        study_material.download_count = F('download_count') + 1
        study_material.save()
        return Response({'status': 'download recorded'}, status=status.HTTP_200_OK)
        
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        Allow anyone to view and download, but require authentication for other actions
        """
        if self.action in ['list', 'retrieve', 'record_download']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
