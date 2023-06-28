from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.MinhasCryptosView.as_view()),
    path('<int:pk>/', views.MinhasCryptosView.CryptoView.as_view()),
]