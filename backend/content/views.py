from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import Category, Content, StudyMaterial, Quiz, Question, Choice
from .serializers import CategorySerializer, ContentSerializer, StudyMaterialSerializer, QuizSerializer

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


# Quiz API
from rest_framework.views import APIView
from rest_framework.decorators import api_view

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quiz.objects.filter(is_published=True)
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        quiz = self.get_object()
        answers = request.data.get('answers', {})  # {question_id: choice_id}
        correct = 0
        total = quiz.questions.count()
        results = []
        for question in quiz.questions.all():
            qid = str(question.id)
            selected = answers.get(qid)
            correct_choice = question.choices.filter(is_correct=True).first()
            is_correct = str(correct_choice.id) == str(selected) if correct_choice else False
            if is_correct:
                correct += 1
            results.append({
                'question': question.text,
                'selected': selected,
                'correct_choice': correct_choice.id if correct_choice else None,
                'is_correct': is_correct,
            })
        return Response({
            'score': correct,
            'total': total,
            'results': results
        })
