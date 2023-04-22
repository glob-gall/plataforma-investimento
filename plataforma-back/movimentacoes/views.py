from django.shortcuts import render

# Create your views here.
from django.http import HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from instituicoes.models import Instituicoes
from utils.getUserPayload import get_user_payload
from usuarios.models import Usuario
from .models import Movimentacoes
from .serializers import MovimentacoesSerializer
# from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed, NotFound
from rest_framework import status


def get_movimentacoes_by_usuario(request):
    payload = request.auth_payload
    movimentacoes = Movimentacoes.objects.filter(usuario = payload['id'])
    serializer = MovimentacoesSerializer(movimentacoes,many=True)
    
    return Response(serializer.data)


    

def register_movimentacao(request):
  payload = request.auth_payload
  data = request.data
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  data['usuario'] = findedUser.id

  institituicaoAssociadaAUsuario = Instituicoes.objects.filter(usuario__id=findedUser.id, id=data['instituicao']).count()
  if not institituicaoAssociadaAUsuario:
    return HttpResponseBadRequest('Instituição não vinculada a este usuário')

  serializer = MovimentacoesSerializer(data = request.data)
  serializer.is_valid(raise_exception = True)
  serializer.save()
  
  return Response(serializer.data)


def delete(request,pk, format=None):
    payload = request.auth_payload
    findedUser = Usuario.objects.filter(id = payload['id']).first()
    if not findedUser:
      raise AuthenticationFailed('Usuario precia estar logado!')
    
    movimentacao = Movimentacoes.objects.filter(id=pk).first()
    if not movimentacao:
      raise NotFound('Movimentacao não encontrada')
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