from rest_framework.response import Response
from rest_framework import viewsets


class StandardResponseViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides the standard response.
    """

    class Meta:
        abstract = True

    def list(self, request, *args, **kwargs):
        ret = super(StandardResponseViewSet, self).list(request)
        return Response(responseSchema(ret.data))

    def create(self, request, *args, **kwargs):
        ret = super(StandardResponseViewSet, self).create(request)
        return Response(responseSchema(ret.data))

    def retrieve(self, request, *args, **kwargs):
        ret = super(StandardResponseViewSet, self).retrieve(request)
        return Response(responseSchema(ret.data))


def responseSchema(data=None, errors=None):
    ret = {}
    if data:
        ret['data'] = data
    if errors:
        ret['errors'] = errors
    return ret
