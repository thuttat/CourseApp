from rest_framework import viewsets,generics,status, parsers, permissions
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response

from courses import serializers,paginators
from courses.models import Category, Course, Lesson, User

class CategoryView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

class CourseView(viewsets.ViewSet, generics.ListAPIView):
    queryset = Course.objects.filter(active=True)
    serializer_class = serializers.CourseSerializer
    pagination_class = paginators.ItemPaginator

    def get_queryset(self):
        query = self.queryset
        q = self.request.query_params.get('q')
        if q:
            query = query.filter(subject__icontains=q)

        cate_id = self.request.query_params.get('category_id')
        if cate_id:
            query = query.filter(category_id=cate_id)

        return query
    @action(methods=['get'], url_path='lesson',detail=True)
    def get_lesson(self,request,pk):
        lesson=self.get_object().lesson_set.filter(active=True)

        serializers.LessonSerializer(lesson,many=True)

        return Response(serializers.LessonSerializer(lesson,many=True).data,status=status.HTTP_200_OK)

class LessonView(viewsets.ViewSet,generics.RetrieveAPIView):
    queryset = Lesson.objects.prefetch_related('tag').filter(active=True)
    serializer_class = serializers.LessonDetailSerializer

    @action(methods=['get'],url_path='comment',detail=True)
    def get_comment(self,request,pk):
        comments=self.get_object().comment_set.select_related('user').filter(active = True)
        return Response(serializers.CommentSerializer(comments,many=True).data,status=status.HTTP_200_OK)

class UserView(viewsets.ViewSet,generics.CreateAPIView):
    queryset = User.objects.filter(is_active = True)
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    @action(methods=['get','patch'],url_path='current-user',detail=False,permission_classes=[permissions.IsAuthenticated])
    def get_current_user(self,request):
        user = request.user
        if request.method.__eq__('PATCH'):
            for k,v in request.data.items():
                if k in ['first_name','last_name','email']:
                    setattr(user,k,v)
            user.save()
        return Response(serializers.UserSerializer(request.user).data,status=status.HTTP_200_OK)

