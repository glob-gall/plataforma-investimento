from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

from .models import MeusInvestimentos
from .serializers import MeusInvestimentosSerializer,MeusInvestimentosGroupSerializer

from investimentos.models import Investimentos
from usuarios.models import Usuario

from investimentos.views import InvestimentosView

class MeusInvestimentosView(APIView):

  class InvestimentoView(APIView):
    def investimento_by_id(self, pk, user_id):
      return MeusInvestimentos.objects.filter(id=pk, usuario=user_id).first()

    def delete(self, request, pk):
      user = request.auth_payload

      investimento = MeusInvestimentos.objects.filter(id=pk, usuario=user.get('id')).first()
      if not investimento:
        return HttpResponse('Investimento não encontrado', status=404)

      investimento.delete()
      return Response(status=204)

  @staticmethod
  def investimento_query(**data):
    return Investimentos.objects.filter(
      valor_compra=data.get('valor_compra'),
      volume=data.get('volume'),
      data_movimentacao=data.get('data_movimentacao'),
      investimento=data.get('investimento'),
      usuario=data.get('usuario'))

  def get(self, request):
    payload = request.auth_payload

    id = request.query_params.get('id')

    if id:
        investimentos = MeusInvestimentos.objects.filter(usuario__id = payload['id'], investimento_id = id).select_related('investimento').all()  
        serializer = MeusInvestimentosSerializer(investimentos, many=True)
        return Response(serializer.data)  
    else:
        investimentos = MeusInvestimentos.objects.filter(usuario__id = payload['id']).select_related('investimento').annotate(volumes=Count("investimento"))
        serializer = MeusInvestimentosSerializer(investimentos, many=True)
        return Response(serializer.data)  
  
  def post(self, request):
      user = request.auth_payload
      data = request.data
      data['usuario'] = user.get('id')

      investimento = Investimentos.objects.filter(id=data['investimento']).first()

      if not investimento:
        return HttpResponse('Investimento não encontrado', status=422)

      data['investimento'] = investimento

      serializer = MeusInvestimentosSerializer(data = data)
      serializer.is_valid(raise_exception = True)

      data['usuario'] = Usuario.objects.filter(id=user.get('id')).first()
      serializer.create(data)

      InvestimentosView.associar_usuario(user.get('id'), investimento)
      return HttpResponse(status=201)