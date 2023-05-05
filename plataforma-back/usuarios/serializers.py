from rest_framework import serializers
from .models import Usuario
# import hashlib

class UsuarioSerializer(serializers.ModelSerializer):
  class Meta:
    model = Usuario
    fields = ['id','name','email','password','birth']
    extra_kwargs = {
      'password':{'write_only': True}
    }
    
    
class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(max_length=255)