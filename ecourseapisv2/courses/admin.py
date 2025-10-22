from ckeditor_uploader import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from ckeditor.fields import RichTextField
from courses.models import Category, Course, Lesson
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class LessonForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Lesson
        fields = '__all__'


class CourseAdmin(admin.ModelAdmin):
    list_display = ["id", "subject", "created_date", "active"]
    search_fields = ["subject"]
    readonly_fields = ["image_view"]
    list_filter = ["subject", "created_date"]

    def image_view(self, course):
        return mark_safe(f"<img src='/static/{course.image.name}' width='120'/>")

    class Media:
        css = {
            'all': ('/static/css/styles.css',)
        }


class LessonAdmin(admin.ModelAdmin):
    form = LessonForm


# Register your models here.
admin.site.register(Category)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
