from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Card)
admin.site.register(User)
admin.site.register(CardDeck)
# admin.site.register(Card_Front)
# admin.site.register(Card_Back)