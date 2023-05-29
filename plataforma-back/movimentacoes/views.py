
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


from usuarios.contas.models import Contas

from usuarios.models import Usuario
from .models import Movimentacoes
from .serializers import MovimentacoesSerializer,MovimentacoesContasSerializer
from usuarios.models import Usuario

from utils.errors import formatErrors,ResponseError

def get_movimentacoes_by_usuario(request):
    payload = request.auth_payload
    queryset = Movimentacoes.objects.filter(usuario = payload['id'])

    dates = request.query_params.get('range')
    orderby = request.query_params.get('orderby')
    description = request.query_params.get('description')
    tipo = request.query_params.get('tipo')
    categoria = request.query_params.get('category')
    conta = request.query_params.get('account')

    if dates:
      [dateMin,dateMax] = dates.split(',')
      queryset=queryset.filter(date__range=[dateMin, dateMax])
    if orderby:
      queryset=queryset.order_by(orderby)
    if description:
      queryset=queryset.filter(description__contains=description)
    if categoria:
      queryset=queryset.filter(categoria=categoria)
    if conta:
      queryset=queryset.filter(conta=conta)
    if tipo == 'ENTRADA':
      queryset=queryset.filter(value__gt=0)
    if tipo == 'SAIDA':
      queryset=queryset.filter(value__lt=0)
      
    serializer = MovimentacoesContasSerializer(queryset,many=True)    
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
    return Response(formatErrors(serializer.errors))
  
  return Response(serializer.data)

def editar_movimentacao(request,pk,format=None):
  payload = request.auth_payload
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  if not findedUser:
    return ResponseError('O usuário precia estar logado.')
  
  movimentacao = Movimentacoes.objects.filter(id=pk).first()

  data={}
  findedAccount = None
  contaId = request.data.get('conta')
  if(contaId):
    data['conta'] =contaId
    findedAccount = Contas.objects.filter(id =contaId).first()
    if not findedAccount:
      return ResponseError('A conta informada não pertence ao usuário logado.')
    if findedUser.pk != findedAccount.usuario.pk:
      return ResponseError('A conta informada não pertence ao usuário logado.')
  else:
    data['conta'] = movimentacao.conta.pk

  try:
    data['description'] = request.data['description'] 
  except:
    data['description'] = movimentacao.description
  try:
    data['date'] = request.data['date'] 
  except:
    data['date'] = movimentacao.date
  try:
    data['value'] = request.data['value'] 
  except:
    data['value'] = movimentacao.value
  try:
    data['categoria'] = request.data['categoria'] 
  except:
    data['categoria'] = movimentacao.categoria

  data['usuario'] = movimentacao.usuario.pk
  serializer = MovimentacoesSerializer(movimentacao, data=data)

  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
  return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)


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
    
    
@api_view(['DELETE','PUT'])
def movimentacoes_edit_delete(request,pk):
  if request.method == 'DELETE':
    return delete(request,pk)
  if request.method == 'PUT':
    return editar_movimentacao(request,pk)


@api_view(['GET'])
def movimentacoes_saldos(request):
  payload = request.auth_payload
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  if not findedUser:
    return ResponseError('O usuário precia estar logado.')
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
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  if not findedUser:
    return ResponseError('O usuário precia estar logado.')

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


@api_view(['GET'])
def movimentacoes_saldos_by_categoria(request):
  payload = request.auth_payload
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  if not findedUser:
    return ResponseError('O usuário precia estar logado.')
  
  categorias = Movimentacoes.Categoria.choices
  
  saldoCategorias=[]
  for categoria in categorias:
    movimentacoesCategoria = Movimentacoes.objects.filter(categoria=categoria[0],usuario=payload['id'])
    saldo=0
    for movimentacao in movimentacoesCategoria:
      saldo+= movimentacao.value
    saldoCategorias.append({
      'categoria':categoria[1],
      'saldo':saldo,
    })

  
  return Response(saldoCategorias)


@api_view(['GET'])
def movimentacoes_categorias(request):
  categorias = Movimentacoes.Categoria.choices
  
  formatedCategorias=[]
  for c in categorias:
    formated = {
      'key':c[0],
      'label':c[1]
    }
    formatedCategorias.append(formated)
  
  return Response(formatedCategorias)