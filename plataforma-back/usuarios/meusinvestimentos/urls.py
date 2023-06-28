from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.MeusInvestimentosView.as_view()),
    path('<int:pk>/', views.MeusInvestimentosView.InvestimentoView.as_view()),
]