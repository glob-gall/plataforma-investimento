# from django.shortcuts import render
# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UsuarioSerializer 
from .models import Usuario
# Create your views here.
# class RegisterView(APIView):
#   def post(self, request):
@api_view(['POST'])
def register_user(request):
    serializer = UsuarioSerializer(data = request.data)
    serializer.is_valid(raise_exception = True)
    serializer.save()
    
    return Response(serializer.data)
    
@api_view(['POST'])
def login_user(request):
  email = request.data['email']
  password = request.data['password']
  
  print(email)
  print(password)
  
  usuario = Usuario.objects.filter(email=email).first()
  if usuario is None:
    raise AuthenticationFailed('Credenciais incorretas')
  if not usuario.check_password(password):
    raise AuthenticationFailed('Credenciais incorretas')
  return Response(usuario)
    