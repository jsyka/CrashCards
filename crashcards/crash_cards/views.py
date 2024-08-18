from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
import os, json
from dotenv import load_dotenv
from django.middleware.csrf import get_token
from django.http import JsonResponse

# Load the environment variables
load_dotenv()

# Configure the generative AI model
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

def generateCards(notes):
    print(notes)
    response = model.generate_content("Create 10 flashcards in a JSON format based off these notes: " + notes)
    print(response.text.strip()[7:-4])
    try:
        # Adjust the slicing or parsing if needed
        response_json = json.loads(response.text.strip()[7:-4])
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        raise
    # response = json.loads(response.text[7:-3])  # Adjusted to parse JSON
    return response_json

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
    
class UserView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class CardDeckView(APIView):
    def get(self, request):
        slide_decks = CardDeck.objects.all()
        serializer = CardDeckSerializer(slide_decks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CardDeckSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
class GenerateFlashcardsView(APIView):
    def post(self, request):
        notes = request.data.get('notes', '')
        if not notes:
            return Response({"error": "No notes provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            flashcards = generateCards(notes)
            return Response(flashcards, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CSRFTokenView(APIView):
    def get(self, request):
        return JsonResponse({'csrfToken': get_token(request)})