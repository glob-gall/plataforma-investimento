from rest_framework import serializers
from .models import Usuario
# import hashlib

class UsuarioSerializer(serializers.ModelSerializer):
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