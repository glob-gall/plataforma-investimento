import jwt, datetime
import hashlib

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

from .models import Usuario
from .serializers import UsuarioSerializer,LoginSerializer
from .models import Token, Usuario
from .utilsEmail import enviar_email_confirmacao
from utils.getUserPayload import get_user_payload
from utils.errors import formatErrors 


SECRET= 'SECRET'

@api_view(['POST'])
def register_user(request):
  try:
    request.data['password'] = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
  except KeyError:
    pass
    
  serializer = UsuarioSerializer(data = request.data)
  
  try:
    serializer.is_valid(raise_exception = True)
    serializer.save()
  except:
    return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)
  
  
  enviar_email_confirmacao(serializer)
  return Response(serializer.data)
    
@api_view(['POST'])
def login_user(request):
  serializer = LoginSerializer(data=request.data)
  try:
    serializer.is_valid(raise_exception = True)
  except:
    return Response(formatErrors(serializer.errors))
  
  email = request.data['email']
  password = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest() 
  usuario = Usuario.objects.filter(email=email).first()
  
  if not usuario:
    raise AuthenticationFailed({
      'errors':[
        {'message':'Credenciais incorretas'}
      ]
    })

  if password != usuario.password:
    raise AuthenticationFailed({
      'errors':[
        {'message':'Credenciais incorretas'}
      ]
    })

  payload = {
    'id':usuario.id,
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
      'birth':usuario.birth,
      'is_active':usuario.is_active,
      'is_email_verified':usuario.is_email_verified,

    }
  })

class UsuarioView(APIView):
  def get(self,request):
    payload = request.auth_payload
    
    usuario = Usuario.objects.filter(id = payload['id']).first()
    if not usuario:
      return Response({'teste':'false'})
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)

  def put(self, request):
    token = request.META.get('HTTP_AUTHORIZATION')
    payload = get_user_payload(token)
    usuario = Usuario.objects.filter(id = payload['id']).first()

    data={}
    try:
      data['name'] = request.data['name'] 
    except:
      data['name'] = usuario.name
    try:
      data['birth'] = request.data['birth'] 
    except:
      data['birth'] = usuario.birth

    data['email'] = usuario.email
    data['password'] = usuario.password
    serializer = UsuarioSerializer(usuario, data=data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)


def confirmEmailView(View,token):
  try:
    objeto_token = get_object_or_404(Token,token=token)
    usuario = objeto_token.usuario
    if(objeto_token.token == token):
      usuario.is_email_verified = True
      usuario.save()
      return HttpResponse("Email confirmado com sucesso")
  except:
    return HttpResponse("Não foi possivel confirmar o email")

