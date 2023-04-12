from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from utils.getUserPayload import get_user_payload
from usuarios.models import Usuario
from .models import Movimentacoes
from .serializers import MovimentacoesSerializer
# from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status


def get_movimentacoes_by_usuario(request):
    payload = get_user_payload(request.META.get('HTTP_AUTHORIZATION'))
    movimentacoes = Movimentacoes.objects.filter(usuario = payload['id'])
    serializer = MovimentacoesSerializer(movimentacoes,many=True)
    
    return Response(serializer.data)


    

def register_movimentacao(request):
  payload = get_user_payload(request.META.get('HTTP_AUTHORIZATION'))
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  data = request.data
  data['usuario'] = findedUser.id
  
  serializer = MovimentacoesSerializer(data = request.data)
  serializer.is_valid(raise_exception = True)
  serializer.save()
  
  return Response(serializer.data)


def delete(request,pk, format=None):
    payload = get_user_payload(request.META.get('HTTP_AUTHORIZATION'))
    findedUser = Usuario.objects.filter(id = payload['id']).first()
    if not findedUser:
      raise AuthenticationFailed('Usuario precia estar logado!')
    
    movimentacao = self.get_object(pk)
    movimentacao.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  
@api_view(['GET','POST'])
def movimentacoes_view(request):
  if request.method == 'POST':
    return register_movimentacao(request)
  if request.method == 'GET':
    return get_movimentacoes_by_usuario(request)
    
    
@api_view(['DELETE'])
def movimentacoes_delete(request,pk):
  if request.method == 'DELETE':
    return delete(request,pk)