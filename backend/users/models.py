from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator


class UserSettings(models.Model):
    user = models.OneToOneField(User, related_name="settings", on_delete=models.CASCADE)
    additionalRepetitions = models.IntegerField(
        default=1, validators=[MaxValueValidator(255), MinValueValidator(1)])
    initialRepetitions = models.IntegerField(
        default=2, validators=[MaxValueValidator(255), MinValueValidator(1)])
    maximumRepetitions = models.IntegerField(
        default=10, validators=[MaxValueValidator(255), MinValueValidator(1)])

    class Meta:
        verbose_name_plural = "User settings"

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_settings(sender, instance, created, **kwargs):
    if created:
        UserSettings.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_settings(instance, **kwargs):
    instance.userSettings.save()
