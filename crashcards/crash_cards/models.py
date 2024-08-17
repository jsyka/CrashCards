from django.db import models
from django.db.utils import OperationalError

# Create your models here.
    
class Card(models.Model):
    title = models.CharField(max_length=100)
    card_front = models.TextField(default="No Question")
    card_back = models.TextField(default="No Answer")
    created_at = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return f"{self.title}, {self.card_front}, {self.card_back}, {self.created_at}" 