from django.urls import path
from . import views


from . import views

urlpatterns = [
    path('', views.CryptosView.as_view()),
]