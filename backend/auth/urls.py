from django.urls import path
from auth.views import GoogleLogin, GoogleRefresh
from allauth.socialaccount.views import SignupView

urlpatterns = [
    # path('', include('dj_rest_auth.urls')),
    path('socialsignup/', SignupView.as_view(), name='socialaccount_signup'),
    path('google/login/', GoogleLogin.as_view(), name='google_login'),
    path('google/refresh/', GoogleRefresh.as_view(), name='google_refresh'),
]
