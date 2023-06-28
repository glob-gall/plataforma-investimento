import jwt, datetime
import hashlib
import json
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
from .models import Token, Usuario, ResetPasswordCode
from .utilsEmail import enviar_email_confirmacao, enviar_email_recuperacao_senha
from utils.getUserPayload import get_user_payload
from utils.errors import formatErrors 
from django.utils.crypto import get_random_string


SECRET= 'SECRET'

@api_view(['POST'])
def register_user(request):
  try:
    request.data['password'] = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
  except KeyError:
    pass
    
  serializer = UsuarioSerializer(data = request.data)
  
  if not serializer.is_valid():
    return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)
  else:
    serializer.save()
  
  
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
  serializer_class = UsuarioSerializer
  queryset = Usuario.objects.all()

  def get(self,request):
    payload = request.auth_payload
    
    usuario = Usuario.objects.filter(id = payload['id']).first()
    if not usuario:
      return Response({'teste':'false'})
    serializer = UsuarioSerializer(usuario)
    return Response(serializer.data)

  def put(self, request):
    payload = request.auth_payload
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
    
    if request.FILES.get('avatar'):
      data['avatar'] = request.FILES.get('avatar')
      
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

def reset_password_request(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        email = data.get('email')
        objeto_token = get_object_or_404(Usuario,email=email)
        usuario = objeto_token 
        if usuario:
          try:
            enviar_email_recuperacao_senha(usuario,email)
            return HttpResponse("Email enviado com sucesso")
          except:
            return HttpResponse("Erro no envio do email", status=400)
        else:
          return HttpResponse("O email digitado não está associado a uma conta", status=400)

def reset_password_confirm(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        data = json.loads(body_unicode)
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        code = data.get('code') 
        if password == confirm_password:
            objeto_code = get_object_or_404(ResetPasswordCode,resetPasswordCode=code)
            usuario = objeto_code.usuario
            if usuario:
                # Atualizar a senha do usuário
                password = hashlib.sha256(password.encode('utf-8')).hexdigest()
                usuario.password = password
                usuario.save()
                return HttpResponse("Senha alterada com sucesso")
            else:
                return HttpResponse("Código invalido", status=400)
        else:
            return HttpResponse("As senhas não correspondem", status=400)