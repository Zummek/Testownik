from django.db.models.aggregates import Count
from utils.StandardResponse import StandardResponseViewSet, responseSchema
from quiz.models import Quiz, Question, Answer
from quiz.serializers import AnswerSerializer, QuestionSerializer, QuizSerializer, QuizWithoutQuestionsSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class QuizViewSet(StandardResponseViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def list(self, request, *args, **kwargs):
        queryset = Quiz.objects.annotate(questions_count=Count('questions'))
        # serializer = self.get_serializer(queryset, many=True)
        serializer = QuizWithoutQuestionsSerializer(queryset, many=True)
        return Response(responseSchema(serializer.data))


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerViewSet(StandardResponseViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
