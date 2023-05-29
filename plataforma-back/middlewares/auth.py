from django.contrib.auth.middleware import MiddlewareMixin
from django.http import HttpResponseForbidden

from utils.getUserPayload import get_user_payload
from rest_framework.exceptions import AuthenticationFailed

class AuthMiddleware(MiddlewareMixin):    


    __HEADER__ = 'HTTP_AUTHORIZATION'
    __OPEN_URIS__ = [('POST', '/api/login/'), ('POST', '/api/register/'), ('GET', '/swagger/')]
    __OPEN_URIS_WITH_PARAMS__ = ['/confirmar_conta/', 'usuario/resetpassword/', 'usuario/resetpasswordconfirm/']

    @staticmethod
    def __is_open(method, uri):
        for open in AuthMiddleware.__OPEN_URIS_WITH_PARAMS__:
            if open in uri:
                return True
            
        return (method, uri,) in AuthMiddleware.__OPEN_URIS__

    def process_view(_, request, args, kwargs, __):
        
        if AuthMiddleware.__is_open(request.method, request.path):
            return None

        token = request.META.get(AuthMiddleware.__HEADER__)

        try:
            payload = get_user_payload(token)
            request.auth_payload = payload
        except AuthenticationFailed as exception:
            return HttpResponseForbidden(exception)

        return None