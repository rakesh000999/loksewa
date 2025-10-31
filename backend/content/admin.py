from django.contrib import admin
from .models import Category, StudyMaterial, Content

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'material_type', 'is_published', 'uploaded_by', 'created_at', 'download_count')
    list_filter = ('material_type', 'category', 'is_published', 'created_at')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    list_editable = ('is_published',)
    list_per_page = 20
    readonly_fields = ('download_count', 'created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'category')
        }),
        ('Material Details', {
            'fields': ('material_type', 'file', 'is_published')
        }),
        ('Upload Information', {
            'fields': ('uploaded_by', 'created_at', 'updated_at', 'download_count'),
            'classes': ('collapse',)
        }),
    )

    def save_model(self, request, obj, form, change):
        if not obj.uploaded_by_id:
            obj.uploaded_by = request.user
        super().save_model(request, obj, form, change)

# Content model is already registered elsewhere, so we're commenting this out
# @admin.register(Content)
# class ContentAdmin(admin.ModelAdmin):
#     list_display = ('title', 'category', 'uploaded_by', 'created_at')
#     list_filter = ('category', 'created_at')
#     search_fields = ('title', 'description')
