# from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views import View
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UsuarioSerializer 
from .models import Token, Usuario
import hashlib
import jwt, datetime
from .models import Usuario
from .utilsEmail import enviar_email_confirmacao



SECRET= 'SECRET'

@api_view(['POST'])
def register_user(request):
  request.data['password'] = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
  print(request.data['password'])
  serializer = UsuarioSerializer(data = request.data)
  serializer.is_valid(raise_exception = True)
  
  
  serializer.save()
  enviar_email_confirmacao(serializer)
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
  
  payload = {
    'id':usuario.id,
    # 'name':usuario.name,
    # 'email':usuario.email,
    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60000),#41 dias(1k)
    'iat': datetime.datetime.utcnow()
  }  
  
  token = jwt.encode(payload,SECRET, algorithm='HS256')#.decode('utf-8')
  
  return Response({
    'jwt':token
  })

class UsuarioView(APIView):
  def get(self,request):
    token = request.META.get('HTTP_AUTHORIZATION')
    if not token:
      raise AuthenticationFailed('Não autorizado')
    
    token = str.replace(str(token), 'Bearer ', '')
    try:
      payload = jwt.decode(token,SECRET,algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
      raise AuthenticationFailed('Não autorizado')
    
    usuario = Usuario.objects.filter(id = payload['id']).first()
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)

def confirmEmailView(View,token,id):
  try:
    objeto_token = get_object_or_404(Token,token=token)
    usuario = objeto_token.usuario
    if(objeto_token.token == token):
      usuario.is_email_verified = True
      usuario.save()
      return HttpResponse("Email confirmado com sucesso")
  except:
    return HttpResponse("Não foi possivel confirmar o email")

