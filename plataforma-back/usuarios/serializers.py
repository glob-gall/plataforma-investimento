from rest_framework import serializers

from instituicoes.serializers import InstituicoesSerializer
from .models import Usuario
# import hashlib

class UsuarioSerializer(serializers.ModelSerializer):
  instituicoes = InstituicoesSerializer(many=True, read_only=True)
  class Meta:
    model = Usuario
    fields = ['id','name','email','password','birth','instituicoes']
    extra_kwargs = {
      'password':{'write_only': True}
    }
    # def create(self,validated_data):
    #   user = Usuario.objects.create(
    #     email = validated_data['email'],
    #     name = validated_data['name'],
    #     password = validated_data['password'],
    #     birth = validated_data['birth'],
    #   )
    #   return user