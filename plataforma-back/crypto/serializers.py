from rest_framework import serializers
from .models import Cryptos

class CryotisSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cryptos
    fields = [
      'id',
      'code',
      'name',
      'logo',
      'value',
    ]