# from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UsuarioSerializer 
from .models import Usuario
import hashlib
import jwt, datetime
from utils.getUserPayload import get_user_payload

SECRET= 'SECRET'

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
  if userNotFound:
    raise AuthenticationFailed('Credenciais incorretas')

  passwordDontMatch = password != usuario.password
  if passwordDontMatch:
    raise AuthenticationFailed('Credenciais incorretas')

  payload = {
    'id':usuario.id,
    # 'name':usuario.name,
    # 'email':usuario.email,
    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60000),#41 dias(1k)
    'iat': datetime.datetime.utcnow()
  }  
  
  token = jwt.encode(payload,SECRET, algorithm='HS256')#.decode('utf-8')
  return Response({
    'jwt':token,
    'user': {
      'id':usuario.id,
      'name':usuario.name,
      'email':usuario.email,
      'birth':usuario.birth
    }
  })

class UsuarioView(APIView):
  def get(self,request):
    payload = request.auth_payload
    
    usuario = Usuario.objects.filter(id = payload['id']).first()
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)
  
  