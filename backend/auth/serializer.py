from rest_framework import fields, serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer


class SocialAuthSerializer(TokenRefreshSerializer):
    refresh_token = serializers.CharField(source='refresh')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('refresh')

    def to_representation(self, obj):
        return {
            ('access_token', obj['access']),
            ('refresh_token', obj['refresh'])
        }
