from django.db.models.aggregates import Count
from rest_framework import serializers
from rest_framework.generics import CreateAPIView
from quiz.models import Answer, Question, Quiz


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'image', 'isCorrect', 'created', 'modified']

    def create(self, validated_data):
        return Answer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.image = validated_data.get('image', instance.image)
        instance.isCorrect = validated_data.get('isCorrect', instance.isCorrect)
        instance.save()
        return instance


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'image', 'answers', 'created', 'modified']

    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        question = Question.objects.create(**validated_data)
        Answer.objects.create(question=question, **answers_data)
        return question

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    questions_count = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = '__all__'

    def create(self, validated_data):
        questions_data = validated_data.pop('questions')
        quiz = Quiz.objects.create(**validated_data)
        Question.objects.create(quiz=quiz, **questions_data)
        return quiz

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance

    def get_questions_count(self, obj):
        return obj.questions_count


class QuizWithoutQuestionsSerializer(QuizSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'name', 'description', 'questions_count', 'created', 'modified']
