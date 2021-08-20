from rest_framework.response import Response
from auth.serializers import SocialAuthSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.views import TokenRefreshView


class GoogleLogin(SocialLoginView):
    authentication_classes = []  # disable authentication
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8080"
    client_class = OAuth2Client


class GoogleRefresh(TokenRefreshView):
    """
    Takes a refresh type JSON web token and returns an access type JSON web
    token if the refresh token is valid.
    """
    serializer_class = SocialAuthSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        serializer = SocialAuthSerializer(response.data)
        return Response(serializer.data)
