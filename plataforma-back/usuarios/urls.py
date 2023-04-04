from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter


# from .views import RegisterView
from . import views
# router = DefaultRouter()
# router.register(r'register', RegisterView)

urlpatterns = [
    # path('', views.index, name='index'),
    # path('register', RegisterView.as_view()),
    path('register/', views.register_user),
    path('login/', views.login_user),
]