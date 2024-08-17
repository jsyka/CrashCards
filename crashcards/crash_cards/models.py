from django.db import models
from django.db.utils import OperationalError

# Create your models here.
    
class Card_Front(models.Model):
    front = models.TextField()

    def __str__(self):
        return f"{self.front}"
    
class Card_Back(models.Model):
    back = models.TextField()

    def __str__(self):
        return f"{self.back}"
    
class Card(models.Model):
    title = models.CharField(max_length=100)
    card_front = models.ForeignKey('Card_Front', on_delete=models.CASCADE, blank=True, null=True)
    card_back = models.ForeignKey('Card_Back', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.card_front:
            try:
                self.card_front, _ = Card_Front.objects.get_or_create(front="No Question")
            except OperationalError:
                pass  # Handle the case where the database is not ready yet
        if not self.card_back:
            try:
                self.card_back, _ = Card_Back.objects.get_or_create(back="No Answer")
            except OperationalError:
                pass
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.title}, {self.card_front.front if self.card_front else 'No Question'}, {self.card_back.back if self.card_back else 'No Answer'}"