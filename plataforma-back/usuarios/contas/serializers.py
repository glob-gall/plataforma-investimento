from rest_framework import serializers

from instituicoes.serializers import InstituicoesSerializer
from .models import Contas

class ContasSerializer(serializers.ModelSerializer):
  instituicao = InstituicoesSerializer(many=False, read_only=True)
  class Meta:
    model = Contas
    fields = [
      'id',
      'descricao',
      'numero',
      'digito',
      'agencia',
      'instituicao',
      'usuario'
    ]