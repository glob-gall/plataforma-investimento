from rest_framework import serializers
from .models import Movimentacoes

class MovimentacoesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movimentacoes
    fields = [
      'description',
      'date',
      'value',
      'usuario'
    ]