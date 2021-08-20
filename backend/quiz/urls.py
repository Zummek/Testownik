from django.urls import path
from django.urls.conf import include

from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers

from quiz import views

router = SimpleRouter()
router.register('', views.QuizViewSet)

quiz_router = routers.NestedSimpleRouter(router, '', lookup='quiz')
quiz_router.register('questions', views.QuestionViewSet, basename='quiz-question')

question_router = routers.NestedSimpleRouter(quiz_router, 'questions', lookup='question')
question_router.register('answers', views.AnswerViewSet, basename='question-answer')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(quiz_router.urls)),
    path('', include(question_router.urls)),
]
