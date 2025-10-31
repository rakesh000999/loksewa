from rest_framework import serializers
from .models import Category, Content, StudyMaterial

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'

class StudyMaterialSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = StudyMaterial
        fields = [
            'id', 'title', 'slug', 'description', 'material_type',
            'file', 'file_url', 'category', 'category_name', 'created_at', 
            'updated_at', 'is_published', 'download_count'
        ]

    def get_file_url(self, obj):
        request = self.context.get('request') if isinstance(self.context, dict) else None
        if obj.file and hasattr(obj.file, 'url'):
            try:
                if request is not None:
                    return request.build_absolute_uri(obj.file.url)
                return obj.file.url
            except Exception:
                return obj.file.url
        return None
