from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.InstituicoesView.as_view()),
]