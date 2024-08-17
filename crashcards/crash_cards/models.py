from django.db import models

# Create your models here.
class Card(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}, {self.description}, {self.created_at}"