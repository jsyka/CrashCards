from rest_framework import serializers
from .models import *

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class CardDeckSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True)
    class Meta:
        model = CardDeck
        fields = '__all__'