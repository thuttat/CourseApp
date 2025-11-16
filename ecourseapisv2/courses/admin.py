from ckeditor_uploader import forms
from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.safestring import mark_safe
from ckeditor.fields import RichTextField
from courses.models import Category, Course, Lesson
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path,include

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

class MyAdminSite(admin.AdminSite):
    site_header = 'eCourse Online'

    def get_urls(self):
        return [path('course-stats/',self.stats_view)] + super().get_urls()
        #<QuerySet [(1, 'Software Engineering', 4), (2, 'Artificial Intelligence', 1), (3, 'Data Sciences', 1)]>

    def stats_view(self,request):
        stats= Category.objects.annotate(count=Count('course')).values('id','name','count')
        return TemplateResponse(request,'admin/stats.html',{'stats':stats})

admin_site = MyAdminSite(name='eCourse')


# Register your models here.
admin_site.register(Category)
admin_site.register(Course, CourseAdmin)
admin_site.register(Lesson, LessonAdmin)
