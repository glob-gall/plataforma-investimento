from rest_framework import serializers
from .models import Movimentacoes
from usuarios.contas.serializers import ContasSerializer
from usuarios.serializers import UsuarioSerializer

class MovimentacoesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movimentacoes
    fields = [
      'id',
      'description',
      'date',
      'value',
      'usuario',
      'conta',
      'categoria'
    ]