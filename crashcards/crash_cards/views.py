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

def createCard(card_front, card_back):
    print("creating card now")
    try:
        card = Card(card_front=card_front, card_back=card_back)
        card.save()
        return card
    except Exception as e:
        print("Error creating card:", e)
        raise

def createCardDeck(title, cards):
    try:
        card_deck = CardDeck(title=title)
        card_deck.save()
        for card in cards:
            card_deck.cards.add(card)
        return card_deck
    except Exception as e:
        print("Error creating card deck:", e)
        raise

def generateCards(notes):
    print(notes)
    response = model.generate_content("Create 10 flashcards in a JSON format based off the following notes. Use 'front' and 'back' as the keys. Do not include extra text at the end. " + notes)
    print(response.text.strip())
    try:
        #parse response
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3]
        response_json = json.loads(response_text)
    except json.JSONDecodeError as e:
        print("JSON decode error:", e)
        raise
    return response_json

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
        
class SaveFlashcardsView(APIView):
    def post(self, request):
        flashcards = request.data.get('flashcards', '')
        deck_title = request.data.get('deckTitle', 'New Deck')

        if not flashcards:
            return Response({"error": "No flashcards provided!"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cards = []
            for i in range(0, 10):
                # print(i, flashcards[i])
                card = createCard(flashcards[i]['front'], flashcards[i]['back'])
                cards.append(card)
            # print(cards)
            card_deck = createCardDeck(deck_title, cards)
            serializer = CardDeckSerializer(card_deck)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"saving error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CSRFTokenView(APIView):
    def get(self, request):
        return JsonResponse({'csrfToken': get_token(request)})