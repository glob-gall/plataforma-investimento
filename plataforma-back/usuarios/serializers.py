from rest_framework import serializers

from instituicoes.serializers import InstituicoesSerializer
from .models import Usuario
# import hashlib

class UsuarioSerializer(serializers.ModelSerializer):
  # instituicoes = InstituicoesSerializer(many=True, read_only=True)
  class Meta:
    model = Usuario
    fields = ['id','name','email','password','birth', 'is_email_verified', 'date_joined']
    extra_kwargs = {
      'password':{'write_only': True}
    }
    
    
class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(max_length=255)