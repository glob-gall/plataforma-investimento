from django.urls import path, include
from . import views


from . import views

urlpatterns = [
    path('', views.movimentacoes_view),
    path('<int:pk>/', views.movimentacoes_edit_delete),
    path('saldos/', views.movimentacoes_saldos),
    path('saldos/distribuicao-saldo/', views.movimentacoes_saldos_by_conta),
    path('saldos/distribuicao-categoria/', views.movimentacoes_saldos_by_categoria),
    path('categorias/', views.movimentacoes_categorias),
]