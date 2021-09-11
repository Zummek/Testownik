from django.db import models
from model_utils.models import TimeStampedModel
from django.core.exceptions import ValidationError


class Answer(TimeStampedModel):
    text = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='quiz/images/', null=True, blank=True)
    isCorrect = models.BooleanField(default=False)
    question = models.ForeignKey('Question', related_name='answers', on_delete=models.CASCADE)

    def __str__(self):
        return self.text

    # def clean(self):
    #     cleaned_data = super().clean()
    #     if not cleaned_data.get('text') and not cleaned_data.get('image'):
    #         raise ValidationError({'text': 'Even one of text or image should have a value.'})
    # TODO: Add validation for text and image fields.


class Question(TimeStampedModel):
    text = models.CharField(max_length=500, null=True, blank=True)
    image = models.ImageField(upload_to='quiz/images/', null=True, blank=True)
    quiz = models.ForeignKey('Quiz', related_name='questions', on_delete=models.CASCADE)

    def __str__(self):
        return self.text

    # def clean(self):
    #     cleaned_data = super().clean()
    #     if not cleaned_data.get('text') and not cleaned_data.get('image'):
    #         raise ValidationError({'text': 'Even one of text or image should have a value.'})
    # TODO: Add validation for text and image fields.


class Quiz(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    url = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Quizzes'
