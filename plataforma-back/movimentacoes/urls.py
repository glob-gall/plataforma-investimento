from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('criar/', views.register_movimentacao),
    path('', views.MovimentacaoView.as_view()),
]