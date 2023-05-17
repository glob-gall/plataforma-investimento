
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
  
  
  findedAccount = None
  contaId = request.data.get('conta')
  if(contaId):
    findedAccount = Contas.objects.filter(id =contaId).first()
    if not findedAccount:
      return ResponseError('A conta informada não pertence ao usuário logado.')
    if findedUser.pk != findedAccount.usuario.pk:
      return ResponseError('A conta informada não pertence ao usuário logado.')
    
  data = request.data
  data['usuario'] = findedUser.pk
  if findedAccount:
    data['conta'] = findedAccount.pk
  serializer = MovimentacoesSerializer(data=data)
  
  try:
    serializer.is_valid(raise_exception = True)
    serializer.save()
  except:
    return ResponseError(formatErrors(serializer.errors))
  
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


@api_view(['GET'])
def movimentacoes_saldos(request):
  payload = request.auth_payload
  movimentacoes = Movimentacoes.objects.filter(usuario = payload['id'])
  
  total=0
  entradas=0
  saidas=0
  for m in movimentacoes:
    total+= m.value
    if m.value < 0:
      saidas-= m.value
    else:
      entradas+= m.value
  return Response({
    'total':total,
    'entradas':entradas,
    'saidas':saidas,
    })


def getSaldoConta(movimentacoes):
  saldo=0
  for m in movimentacoes:
      saldo+= m.value
  return saldo
  
@api_view(['GET'])
def movimentacoes_saldos_by_conta(request):
  payload = request.auth_payload

  contas = Contas.objects.filter(usuario__id = payload['id']).all()
  
  saldoContas=[]
  for conta in contas:
    conta.pk
    movimentacoesDaConta = Movimentacoes.objects.filter(conta = conta.pk)

    saldo=getSaldoConta(movimentacoesDaConta)
    saldoContas.append({
      'conta':conta.descricao,
      'saldo':saldo
    })

  movimentacoesSemConta = Movimentacoes.objects.filter(conta = None,usuario__id = payload['id'])
  saldoContas.append({
      'conta':'outros',
      'saldo':getSaldoConta(movimentacoesSemConta)
    })
  
  return Response(saldoContas)
