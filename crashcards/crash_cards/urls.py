from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.CardsView.as_view(), name='cards'),
    path('user/', views.UserView.as_view(), name='cardfront'),
    path('carddeck/', views.CardDeckView.as_view(), name='carddeck'),
    # path('cards/<int:pk>/', views.CardRetrieveUpdateDestroy.as_view(), name='card-retrieve-update-destroy'),
    path('generate-flashcards/', views.GenerateFlashcardsView.as_view(), name='generate-flashcards'),
    path('csrf-token/', views.CSRFTokenView.as_view(), name='csrf-token'),
]