from django.urls import path
from . import views
from base.views import is_superuser  # Import the is_superuser view
from django.contrib.auth import views as auth_views  # Import Django's auth views
from .views import createOrder  # Import the createOrder view
from .views import get_users  # Import the get_users view
from .views import get_game_details  # Import your new view

urlpatterns = [
    # Existing endpoints
    path('api/games/', views.getGames, name="get-games"),
    path('api/game/<str:pk>/', views.getGame, name="get-game"),
    path('api/dashboard-stats/', views.getDashboardStats, name="dashboard-stats"),
    path('api/order-details/', views.getOrderDetails, name="order-details"),
    path('api/is_superuser/', is_superuser, name='is_superuser'),  # Define the URL for the is_superuser view
    path('api/create-order/', createOrder, name='create-order'),  # Add this line for order creation
    path('api/users/', get_users, name='get_users'),  # Add this line
    path('api/game-details/', get_game_details, name='get_game_details'),  # Add this line

    # New endpoints for ratings
    path('api/purchased-games/', views.get_purchased_games, name='get_purchased_games'),  # Fetch purchased games
    path('api/submit-rating/', views.submit_rating, name='submit_rating'),  # Submit a rating
]