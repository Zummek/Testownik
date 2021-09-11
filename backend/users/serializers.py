from users.models import UserSettings
from rest_framework import serializers


class UserSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserSettings
        fields = ['additionalRepetitions', 'initialRepetitions', 'maximumRepetitions']
