from utils.StandardResponse import responseSchema
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from users.serializers import UserSettingsSerializer


class UserSettingsView(RetrieveUpdateAPIView):
    serializer_class = UserSettingsSerializer

    # TODO: It could be optimized by using select_related on user auth model
    def get_object(self):
        return self.request.user.settings

    def get(self, request, *args, **kwargs):
        ret = super(UserSettingsView, self).retrieve(request)
        return Response(responseSchema(ret.data))

    def put(self, request, *args, **kwargs):
        ret = super(UserSettingsView, self).put(request)
        return Response(responseSchema(ret.data))
