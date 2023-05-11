from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Contas
from .serializers import ContasSerializer

from instituicoes.models import Instituicoes
from usuarios.models import Usuario

from instituicoes.views import InstituicoesView

class ContasUsuariosView(APIView):

  class ContaView(APIView):
    
    def conta_by_id(self, pk, user_id):
      return Contas.objects.filter(id=pk, usuario=user_id).first()

    def delete(self, request, pk):
      user = request.auth_payload

      conta = self.conta_by_id(pk, user.get('id'))
      if not conta:
        return HttpResponse('Conta não encontrada', status=404)

      conta.delete()
      return Response(status=204)


    def put(self, request, pk):
      user = request.auth_payload

      conta = self.conta_by_id(pk, user.get('id'))
      if not conta:
        return HttpResponse('Conta não encontrada', status=404)

      data = request.data
      data['usuario'] = user.get('id')

      serializer = ContasSerializer(data = data)
      serializer.is_valid(raise_exception = True)

      conta.agencia = data.get('agencia')
      conta.numero = data.get('numero')
      conta.digito = data.get('digito')
      conta.descricao = data.get('descricao')

      conta.save()
      return Response(ContasSerializer(conta).data)
    pass


  @staticmethod
  def conta_query(**data):
    return Contas.objects.filter(
      agencia=data.get('agencia'),
      numero=data.get('numero'),
      digito=data.get('digito'),
      instituicao=data.get('instituicao'),
      usuario=data.get('usuario'))

  def get(self, request):
    payload = request.auth_payload
    
    contas = Contas.objects.filter(usuario__id = payload['id']).select_related('instituicao').all()
    serializer = ContasSerializer(contas, many=True)
    return Response(serializer.data)
  
  def post(self, request):
      user = request.auth_payload
      data = request.data
      data['usuario'] = user.get('id')

      instituicao = Instituicoes.objects.filter(id=data['instituicao']).first()

      if not instituicao:
        return HttpResponse('Instituicao não encontrada', status=422)

      same_account = ContasUsuariosView.conta_query(**data).count()
      if same_account:
        return HttpResponse('Conta já existe', status=422)

      data['instituicao'] = instituicao
      data['descricao'] = data.get('descricao', '')

      serializer = ContasSerializer(data = data)
      serializer.is_valid(raise_exception = True)

      data['usuario'] = Usuario.objects.filter(id=user.get('id')).first()
      serializer.create(data)

      InstituicoesView.associar_usuario(user.get('id'), instituicao)
      return HttpResponse(status=201)
  
  