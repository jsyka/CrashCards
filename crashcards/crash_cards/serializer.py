from rest_framework import serializers
from .models import *

class CardSerializer(serializers.ModelSerializer):
    card_front = serializers.StringRelatedField()
    card_back = serializers.StringRelatedField()
    class Meta:
        model = Card
        fields = '__all__'