from django.urls import  path, include
from courses import views
from rest_framework.routers import DefaultRouter

r = DefaultRouter()
r.register('categories',views.CategoryView,basename='category')

urlpatterns = [
    path('',include(r.urls))
]
