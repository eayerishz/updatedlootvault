from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image_url = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name

    def update_average_rating(self):
        """Calculate and update the average rating for the game."""
        ratings = self.userrating_set.all()
        if ratings.exists():
            self.rating = ratings.aggregate(models.Avg('rating'))['rating__avg']
            self.numReviews = ratings.count()
        else:
            self.rating = 0.0
            self.numReviews = 0
        self.save()


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    @property
    def total_price(self):
        return self.quantity * self.game.price

    def __str__(self):
        return f"{self.quantity} x {self.game.name} (Order: {self.order.id})"


class UserRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey('Game', on_delete=models.CASCADE)
    rating = models.IntegerField()  # Rating from 1 to 5
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'game')  # Ensure a user can only rate a game once

    def __str__(self):
        return f"{self.user.username} rated {self.game.name} {self.rating} stars"

    def save(self, *args, **kwargs):
        """Override save to update the game's average rating."""
        super().save(*args, **kwargs)
        self.game.update_average_rating()