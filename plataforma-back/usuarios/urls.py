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
    path('usuario/', views.UsuarioView.as_view()),
    path('confirmar_conta/<token>/',views.confirmEmailView),
    path('usuario/contas/', include("usuarios.contas.urls")),
    path('usuario/resetpassword/', views.reset_password_request),
    path('usuario/resetpasswordconfirm/', views.reset_password_confirm),
]