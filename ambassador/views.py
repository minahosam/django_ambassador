from django.shortcuts import render
from rest_framework.views import APIView
from core.models import *
from core.serializer import *
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
import time
from django.db.models import Q
from core.authenticate import jwt_authenticate
from rest_framework.permissions import IsAuthenticated
import math,random,string
from django_redis import get_redis_connection
from .serializers import *

# Create your views here.

class ProductFrotend(APIView):
    @method_decorator(cache_page(60*60*2,key_prefix='cache_frontend'))
    def get(self,request):
        time.sleep(2)
        products=Product.objects.all()
        serialize = ProductSerializer(products,many=True)
        return Response (serialize.data,status=status.HTTP_200_OK)
    
class ProductBackend(APIView):
    def get(self,request):
        products = cache.get('cache_backend')
            # print('1')
        if not products:
            time.sleep(2)
            products = list(Product.objects.all())
            # print('b')
            cache.set('cache_backend',products,timeout= 60*30)
        s = request.query_params.get('s','')
        if s:
            products = list([
                p for p in products
                if(s.lower() in p.title.lower())or (s.lower() in p.description.lower())
            ])
            # products=Product.objects.filter( Q(title__icontains=s) | Q(description__icontains=s))
        total = len(products)
        sort = request.query_params.get('sort',None)
        # print(sort)
        if sort == 'asc':
            # products = Product.objects.all().order_by('id')
            products.sort(key= lambda p:p.price)
            # print('a')
        elif sort == 'desc':
            # products = Product.objects.all().order_by('-id')
            products.sort(key= lambda p:p.price , reverse=True)
            # print('l')
        per_page = 3
        page = int(request.query_params.get('page',1))
        start = (page - 1) * per_page
        end = page * per_page
        serialize = ProductSerializer(products[start:end],many=True)
        return Response ({
            'data': serialize.data,
            'meta':{
                'total':total,
                'page':page,
                'last_page':math.ceil(total / per_page)
            }
            },status=status.HTTP_200_OK)
        
class LinkApiView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        print(request.user)
        user = request.user
        # print(user)
        userr = User.objects.get(email=user)
        # print(userr)
        # me = User.objects.get(email = request.user)
        # me = User.objects.get(email=request.user)
        # print(me.id)
        data = request.data['products']
        serialize = linkAmbassadorSerializer(data={
            'user':userr.id,
            'products':data,
            
            'code':''.join(random.choices(string.ascii_lowercase+string.digits,k=6))
        })
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data,status=status.HTTP_200_OK)
        return Response(serialize.errors)
    
class StatsApiView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(email=request.user)
        linked_user = Link.objects.filter(user=user.id)
        print(linked_user)
        return Response ([self.format(link) for link in linked_user])
    def format(self, link):
        order = Order.objects.filter(code = link.code , completed = 1)
        print(order)
        return {
            'id':link.id,
            'code': link.code,
            'count': len(order),
            'revenue': sum(o.ambassador_revenue for o in order)
        }
        
class RankingApiView(APIView):
    authentication_classes = [jwt_authenticate]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # ambassador_users = User.objects.filter(is_ambasser = True)
        # response = list({
        #         'name':a.FullName,
        #         'revenue': a.revenue,
        #     } for a in ambassador_users)
        # response.sort(key=lambda x:x['revenue'],reverse=True)
        
        # return Response(response)
        con = get_redis_connection('default')
        rankings = con.zrevrangebyscore('rank',min=0,max=1000,withscores=True)
        return Response({
            r[0].decode('utf-8'):r[1] for r in rankings
        })