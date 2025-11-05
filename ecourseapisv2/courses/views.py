from rest_framework import viewsets,generics
from courses import serializers
from courses.models import Category, Course

class CategoryView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializers_class = serializers.CatgorySerializer
