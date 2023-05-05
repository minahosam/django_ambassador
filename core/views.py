from django.shortcuts import render
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import exceptions
from .authenticate import jwt_authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics,mixins
from django.core.cache import cache


# Create your views here.

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        data['is_ambasser']='api/ambassador' in request.path
        serialize = RegisterUserSerializer(data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        else:
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        scope = 'ambassador' if 'api/ambassador' in request.path else 'admin'
        email = request.data.get('email')
        password = request.data.get('password')
        required_email = User.objects.filter(email=email).first()
        # if required_email is None:
        #     raise exceptions.AuthenticationFailed('User not found!')

        # if not required_email.check_password(password):
        #     raise exceptions.AuthenticationFailed('Incorrect Password!')

        # scope = 'ambassador' if 'api/ambassador' in request.path else 'admin'

        # if required_email.is_ambasser and scope == 'admin':
        #     raise exceptions.AuthenticationFailed('Unauthorized')

        # token = jwt_authenticate.authen(required_email.id, scope)

        # response = Response()
        # response.set_cookie(key='jwt', value=token, httponly=True,samesite='none',secure=True)
        # response.data = {
        #     'message': 'success',
        #     'token': token,
        # }

        # return response
        if required_email:
            if required_email.check_password(password):
                # authenticated = jwt_authenticate()
                # print(authenticated)
                # print(scope)
                token = jwt_authenticate.authen(required_email.id,scope)
                # print(token)
                # print(required_email.is_ambasser)
                # print(scope)
                if required_email.is_ambasser == True and scope == 'admin':
                    raise exceptions.AuthenticationFailed('login failed')
                response = Response()
                print(response)
                # httponly to work with web
                response.set_cookie(key='jwt',value=token,httponly=True,samesite='none',secure=True)
                response.data = {
                    'message':'success',
                    'token':token
                }
                return response
            else:
                raise exceptions.AuthenticationFailed('password not correct')
        else:
            raise exceptions.AuthenticationFailed('email not correct')

class ListUserView(APIView):
    # authentication_classes = [jwt_authenticate]
    authentication_classes = (jwt_authenticate,)
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        print(request.user)
        me = User.objects.get(email=request.user)
        # print('-----------------------------------------------------')
        # print(request.user)
        # print('------------------------------------------------')
        serialize = RegisterUserSerializer(me).data
        if 'api/ambassador' in request.path:
            serialize['revenue'] = me.revenue
        return Response(serialize,status=status.HTTP_200_OK)


class LogoutUserView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        response = Response()
        response.delete_cookie(key='jwt',samesite='none')
        response.data = {
            'success':'true'
        }
        return response


class ProfileUpdateView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def put(self,request):
        me =User.objects.get(email=request.user)
        serialize = RegisterUserSerializer(me,data=request.data,partial=True)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        else:
            return Response(serialize.errors,status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def put(self, request):
        me = User.objects.get(email=request.user)
        new_password = request.data
        if new_password['password'] != new_password['confirm_password']:
            raise exceptions.APIException(' password does not match')
        me.set_password(new_password['password'])
        me.save()
        return Response ('password changed', status=status.HTTP_200_OK)
    

class ListUsers(APIView):
    def get(self,request):
        all_users=User.objects.filter(is_ambasser=True)
        serialize= RegisterUserSerializer(all_users,many=True)
        return Response(serialize.data,status=status.HTTP_200_OK)
    
    
class ProductsApiView(
    generics.GenericAPIView,mixins.RetrieveModelMixin,mixins.ListModelMixin,mixins.CreateModelMixin,mixins.UpdateModelMixin,
    mixins.DestroyModelMixin
):
    authentication_classes =[jwt_authenticate]
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset=Product.objects.all()
    def get(self,request,pk=None):
        if pk:
            return self.retrieve(request,pk)
        return self.list(request)
    def post(self,request):
        cache.delete('cache_frontend')
        cache.delete('cache_backend')
        return self.create(request)
    def put(self,request,pk):
        cache.delete('cache_frontend')
        cache.delete('cache_backend')
        return self.partial_update(request,pk)
    def delete(self,request,pk):
        cache.delete('cache_frontend')
        cache.delete('cache_backend')
        return self.destroy(request,pk)
    
class LinkApiView(APIView):
    authentication_classes= [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def get(self,request,pk=None):
        link=Link.objects.filter(user=pk)
        serialize=LinkSerializer(link,many=True)
        return Response(serialize.data,status=status.HTTP_200_OK)
    
class OrderApiView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        orders = Order.objects.filter(completed=True)
        serialize = OrderSerializer(orders,many=True)
        return Response(serialize.data,status=status.HTTP_200_OK)