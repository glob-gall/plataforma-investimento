from rest_framework import serializers
from .models import Instituicoes

class InstituicoesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Instituicoes
    fields = [
      'id',
      'nome',
      'thumb',
      'codigo',
      'ispb',
    ]