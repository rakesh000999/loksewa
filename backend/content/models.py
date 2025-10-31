from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class StudyMaterial(models.Model):
    MATERIAL_TYPES = (
        ('notes', 'Study Notes'),
        ('practice', 'Practice Questions'),
        ('syllabus', 'Syllabus'),
        ('previous', 'Previous Year Questions'),
        ('guide', 'Study Guide'),
        ('other', 'Other'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(help_text="Brief description of the study material")
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPES)
    file = models.FileField(
        upload_to='study_materials/%Y/%m/',
        help_text="Upload PDF, DOC, or DOCX files"
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        related_name='study_materials'
    )
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(
        default=False,
        help_text="Only published materials are visible to users"
    )
    download_count = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Study Material"
        verbose_name_plural = "Study Materials"

class Content(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    file = models.FileField(upload_to='uploads/', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='contents')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Quiz feature models
class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.CharField(max_length=500)

    def __str__(self):
        return self.text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=300)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text
