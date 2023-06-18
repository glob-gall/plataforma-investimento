from rest_framework import serializers

from investimentos.serializers import InvestimentosSerializer
from .models import MeusInvestimentos

class MeusInvestimentosSerializer(serializers.ModelSerializer):
  investimento = InvestimentosSerializer(many=False, read_only=True)
  class Meta:
    model = MeusInvestimentos
    fields = [
      'id',
      'volume',
      'valor_compra',
      'data_movimentacao',
      'investimento',
      'usuario'
    ]


class MeusInvestimentosGroupSerializer(serializers.ModelSerializer):
  investimento = InvestimentosSerializer(many=False, read_only=True)
  class Meta:
    model = MeusInvestimentos
    fields = [
        'id',
        'investimento',
    ]