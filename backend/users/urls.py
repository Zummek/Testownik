from users.views import UserSettingsView
from django.urls import path

urlpatterns = [
    path('settings/', UserSettingsView.as_view()),
]
