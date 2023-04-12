from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.movimentacoes_view),
    path('<int:pk>/', views.movimentacoes_delete),
]