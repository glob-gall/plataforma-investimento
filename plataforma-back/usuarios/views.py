# from django.shortcuts import render
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UsuarioSerializer 
from .models import Usuario
import hashlib

@api_view(['POST'])
def register_user(request):
  request.data['password'] = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
  print(request.data['password'])
  serializer = UsuarioSerializer(data = request.data)
  serializer.is_valid(raise_exception = True)
  
  
  serializer.save()
  return Response(serializer.data)
    
@api_view(['POST'])
def login_user(request):
  email = request.data['email']
  password = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest() 
  usuario = Usuario.objects.filter(email=email).first()
 
  userNotFound = usuario is None
  passwordDontMatch = password != usuario.password
  if userNotFound or passwordDontMatch:
    raise AuthenticationFailed('Credenciais incorretas')
    
  
  return Response({
    'id': usuario.id,
    'email': usuario.email,
    'name': usuario.name,
    'password': usuario.password,
  })
    