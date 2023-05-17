from django.shortcuts import render

# Create your views here.
from django.http import HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from usuarios.contas.models import Contas
from usuarios.contas.serializers import ContasSerializer

from usuarios.models import Usuario
from .models import Movimentacoes
from .serializers import MovimentacoesSerializer
from usuarios.models import Usuario

from utils.errors import formatErrors,ResponseError

def get_movimentacoes_by_usuario(request):
    payload = request.auth_payload
    queryset = Movimentacoes.objects.filter(usuario = payload['id'])

    dates = request.query_params.get('range')
    orderby = request.query_params.get('orderby')

    if dates:
      [dateMin,dateMax] = dates.split(',')
      queryset=queryset.filter(date__range=[dateMin, dateMax])
    if orderby:
      queryset=queryset.order_by(orderby)
      
    serializer = MovimentacoesSerializer(queryset,many=True)    
    return Response(serializer.data)


def register_movimentacao(request):
  payload = request.auth_payload
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  if not findedUser:
    return ResponseError('O usuário precia estar logado.')
  
  dataId = None
  if(request.data['conta']):
    dataId = request.data['conta']
    findedAccount = Contas.objects.filter(id =dataId).first()
    if not findedAccount:
      return ResponseError('A conta informada não pertence ao usuário logado.')
    if findedUser.pk != findedAccount.usuario.pk:
      return ResponseError('A conta informada não pertence ao usuário logado.')
    dataId = findedAccount.pk
  
  data = request.data
  data['usuario'] = findedUser.id
  if dataId:
    data['conta'] = dataId
  serializer = MovimentacoesSerializer(data = data)
  
  try:
    serializer.is_valid(raise_exception = True)
    serializer.save()
  except:
    return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)
  
  return Response(serializer.data)


def delete(request,pk, format=None):
    payload = request.auth_payload
    findedUser = Usuario.objects.filter(id = payload['id']).first()
    if not findedUser:
      return ResponseError('O usuário precia estar logado!')
    
    movimentacao = Movimentacoes.objects.filter(id=pk).first()
    if not movimentacao:
      return ResponseError('Movimentação não encontrada')
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
