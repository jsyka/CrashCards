from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.CardsView.as_view(), name='cards'),
    path('cardfront/', views.CardFrontView.as_view(), name='cardfront'),
    path('cardback/', views.CardBackView.as_view(), name='cardback'),
    # path('cards/<int:pk>/', views.CardRetrieveUpdateDestroy.as_view(), name='card-retrieve-update-destroy'),
]