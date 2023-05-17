from rest_framework import serializers
from .models import Movimentacoes
from usuarios.contas.serializers import ContasSerializer
from usuarios.serializers import UsuarioSerializer

class MovimentacoesSerializer(serializers.ModelSerializer):
  conta = ContasSerializer(many=False, read_only=True)
  class Meta:
    model = Movimentacoes
    fields = [
      'id',
      'description',
      'date',
      'value',
      'usuario',
      'conta'
    ]