from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.CardsView.as_view(), name='cards'),
    path('user/', views.UserView.as_view(), name='cardfront'),
    path('slidedeck/', views.SlideDeckView.as_view(), name='slidedeck'),
    # path('cards/<int:pk>/', views.CardRetrieveUpdateDestroy.as_view(), name='card-retrieve-update-destroy'),
]