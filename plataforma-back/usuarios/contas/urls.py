from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.ContasUsuariosView.as_view()),
    path('<int:pk>/', views.ContasUsuariosView.ContaView.as_view()),
]