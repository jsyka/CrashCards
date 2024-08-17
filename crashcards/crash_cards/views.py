from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response

# Create your views here.
class CardsView(APIView):
    def get(self, request):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class CardFrontView(APIView):
    def get(self, request):
        card_front = Card_Front.objects.all()
        serializer = CardFrontSerializer(card_front, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CardFrontSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class CardBackView(APIView):
    def get(self, request):
        card_back = Card_Back.objects.all()
        serializer = CardBackSerializer(card_back, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CardBackSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)