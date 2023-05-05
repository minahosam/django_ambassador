from django.shortcuts import render
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
from django.db import transaction
import decimal
import stripe
from django.core.mail import send_mail

# Create your views here.

class LinkApiView(APIView):
    def get(self, _,code=''):
        link = Link.objects.filter(code=code).first()
        serialize = LinkSerializer(link)
        return Response(serialize.data)
    

class CreateOrderApiView(APIView):
    @transaction.atomic
    def post(self, request):
        data = request.data
        link = Link.objects.filter(code=data['code']).first()
        if not link:
            raise exceptions.APIException('invalid link')
        items = []
        try:
            order = Order()
            order.order_user = link.user
            order.code = link.code
            order.ambassador_email = link.user.email
            order.first_name = link.user.first_name
            order.last_name = link.user.last_name
            order.email = link.user.email
            order.address = data['address']
            order.city = data['city']
            order.country = data['country']
            order.zip = data['zip']
            order.save()
            # with transaction.atomic:
            #     order.save()
            # print(data['products'])
            for item in data['products']:
                print(item)
                product = Product.objects.filter(pk=item['id']).first()
                quantity = decimal.Decimal(item['quantity'])
                orderItem = OrderItem()
                orderItem.order = order
                orderItem.product_title = product.title
                orderItem.price = product.price
                orderItem.quantity = quantity
                orderItem.admin_revenue = decimal.Decimal(.1)*product.price*quantity
                orderItem.ambassador_revenue = decimal.Decimal(.9)*product.price*quantity
                orderItem.save()
                # with transaction.atomic():
                #     orderItem.save()
            #     items.append({
            #         'name' : product.title,
            #         'description' : product.description,
            #         'image' : [product.image],
            #         'price' : int( 100 * product.price),
            #         'currrency' : 'usd',
            #         'quantity' : quantity,
            #     })
            # stripe.api_key = 'sk_test_51H0wSsFHUJ5mamKOVQx6M8kihCIxpBk6DzOhrf4RrpEgqh2bfpI7vbsVu2j5BT0KditccHBnepG33QudcrtBUHfv00Bbw1XXjL'
            # payment = stripe.checkout.Session.create(
            #     success_url = 'https://localhost:5000/success?source={CHECKOUT_SESSION_ID}',
            #     cancel_url = 'https://localhost:5000/cancel',
            #     payment_method_types = ['CARD'],
            #     items = items
            # )
            # order.transaction_id = payment['id']
            # order.save()
            return Response({
                'message': 'success',
            })
        except Exception:
            transaction.rollback()
        return Response({
            'message': 'error',
        })
        
class cofirmOrder(APIView):
    def post(self,request):
        order = Order.objects.filter(transaction_id=request.data['source'])
        if not order:
            raise exceptions.APIException('Order not found')
        order.completed = True
        order.save()
        
        # Admin Email
        send_mail(
            subject='An Order has been completed',
            message='Order #' + str(order.id) + 'with a total of $' + str(order.admin_revenue) + ' has been completed!',
            from_email='from@email.com',
            recipient_list=['admin@admin.com']
        )

        send_mail(
            subject='An Order has been completed',
            message='You earned $' + str(order.ambassador_revenue) + ' from the link #' + order.code,
            from_email='from@email.com',
            recipient_list=[order.email]
        )
        
        return Response({
            'message' : 'success',
        })