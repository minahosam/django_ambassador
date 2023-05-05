from rest_framework import serializers
from .models import *
from rest_framework import exceptions
from django.core.exceptions import ValidationError


class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'},write_only=True)
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password':{'write_only':True},
        }
    def create(self,validated_data):
        email = validated_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError({'email was exists'})
        password = validated_data.pop('password', None)
        print (password)
        password2=validated_data.pop('password2', None)
        print (password2)
        if str(password) != str(password2):
            raise exceptions.APIException({"password not exists"})
        instance = self.Meta.model(**validated_data)
        print (instance)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'
                
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderSerializer(serializers.ModelSerializer):
    # order_items = OrderItemSerializer(many=True)
    order_items = serializers.SerializerMethodField('get_order_items')
    total = serializers.SerializerMethodField('get_total_price')
    def get_total_price(self,obj):
        price = OrderItem.objects.filter(order=obj.id)
        return sum((o.price * o.quantity) for o in price)
    def get_order_items(self,obj):
        order_items = OrderItem.objects.filter(order=obj.id)
        serialize = OrderItemSerializer(order_items,many=True)
        return serialize.data
    class Meta:
        model = Order
        fields = '__all__'

class LinkSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField('get_orders')

    def get_orders(self, obj):
        order = Order.objects.filter(code=obj.code)
        serialize = OrderSerializer(order,many=True)
        return serialize.data
        # return OrderSerializer(Order.objects.filter(code=obj.code), many=True).data
    class Meta:
        model = Link
        fields = '__all__'
