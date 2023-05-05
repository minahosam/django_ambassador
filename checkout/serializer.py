from rest_framework import serializers
from core.models import *

class ProductrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
        
        
class USERSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
        
class LinkSerializer(serializers.ModelSerializer):
    products = ProductrSerializer(many=True)
    user = USERSerializer()
    class Meta:
        model = Link
        fields = '__all__'
        
