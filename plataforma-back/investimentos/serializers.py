from rest_framework import serializers
from .models import Investimentos

class InvestimentosSerializer(serializers.ModelSerializer):
  class Meta:
    model = Investimentos
    fields = [
      'id',
      'code',
      'name',
      'logo',
      'value',
    ]