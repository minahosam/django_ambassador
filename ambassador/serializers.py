from rest_framework import serializers
from core.models import *



class linkAmbassadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'