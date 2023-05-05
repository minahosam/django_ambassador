import jwt,datetime
from project import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from .models import *

class jwt_authenticate(BaseAuthentication):
    def authenticate(self,request):
        is_ambasser = 'api/ambassador' in request.path
        # token stored in cookie
        token=request.COOKIES.get('jwt')
        # print(token)
        if not token:
            return None
        try:
            # decode token to get actual user data
            payload = jwt.decode(token,settings.SECRET_KEY,algorithms=['HS256'])
            print(payload)
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('unauthenticated')
        # print('---------')
        # print(payload['scope'])
        # print(is_ambasser)
        if ( is_ambasser and payload['scope'] != 'ambassador' ) or ( not is_ambasser and payload['scope'] != 'admin' ):
            raise exceptions.AuthenticationFailed('Invalid Scope')
        user = User.objects.get(id=payload['sub'])
        if  user is None:
            raise exceptions.AuthenticationFailed('user not found')
        return (user,None)

    @staticmethod
    def authen(id,scope):
        payload={
            # user id to make token
            'sub':id,
            # creation date
            'iat':datetime.datetime.utcnow(),
            # expiration date
            'exp':datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'scope':scope,
        }
        # print(scope)
        return jwt.encode(payload,settings.SECRET_KEY,algorithm='HS256')