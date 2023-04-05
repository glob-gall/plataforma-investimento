from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Usuario
# import hashlib

class UsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Usuario
    fields = ['id','name','email','password']
    extra_kwargs = {
      'password':{'write_only': True}
    }
    def create(self,validated_data):
      # hashedPassword = hashlib.sha256(validated_data['password'].encode('utf-8'))
      # print('hash:',hashedPassword )
      user = Usuario.objects.create(
        email = validated_data['email'],
        name = validated_data['name'],
        password = validated_data['password'],#hashedPassword,
      )
      return user