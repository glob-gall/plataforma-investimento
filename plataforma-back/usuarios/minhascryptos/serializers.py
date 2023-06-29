from rest_framework import serializers

from crypto.serializers import CryptosSerializer
from .models import MinhasCryptos

class MinhasCryptosSerializer(serializers.ModelSerializer):
  crypto = CryptosSerializer(many=False, read_only=True)
  class Meta:
    model = MinhasCryptos
    fields = [
      'id',
      'volume',
      'valor_compra',
      'data_movimentacao',
      'crypto',
      'usuario'
    ]


class MinhasCryptosGroupSerializer(serializers.ModelSerializer):
  crypto = CryptosSerializer(many=False, read_only=True)
  class Meta:
    model = MinhasCryptos
    fields = [
        'id',
        'crypto',
    ]