from django.shortcuts import render
from django.http import HttpResponse
from itertools import groupby

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

from .models import MeusInvestimentos
from .serializers import MeusInvestimentosSerializer,MeusInvestimentosGroupSerializer
from utils.errors import formatErrors 
from rest_framework import status

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
    

    investimentos = MeusInvestimentos.objects.filter(usuario__id = payload['id'])#.select_related('investimento').annotate(volumes=Count("investimento"))
    serializer = MeusInvestimentosSerializer(investimentos, many=True)
    investimentos = serializer.data

    def investimentoGroup(compra):
      return compra['investimento']['id']
    
    investimentosGroup=[]
    for key, group in groupby(investimentos, investimentoGroup):
      
      volumeTotal = 0
      valorTotal = 0
      investimento = {
        'name':'',
        'logo':'',
        'value':0.0
      }
      for compra in group:
        valorTotal += float(compra['volume']) * float(compra['valor_compra'])
        volumeTotal += int(compra['volume'])
        investimento['name'] = compra['investimento']['name']
        investimento['value'] = compra['investimento']['value']
        investimento['logo'] = compra['investimento']['logo']


      totalAtual = float(investimento['value']) * volumeTotal
      totalPago = (valorTotal/volumeTotal)*volumeTotal

      investimentosGroup.append({
        'key': key,
        'volume_total': volumeTotal,
        'valor_medio_compra': valorTotal/volumeTotal,
        'investimento':investimento,
        'retorno':totalAtual - totalPago
      })
  

    return Response(investimentosGroup)  
  
  def post(self, request):
      user = request.auth_payload
      data = request.data
      data['usuario'] = user.get('id')

      investimento = Investimentos.objects.filter(id=data['investimento']).first()

      if not investimento:
        return HttpResponse('Investimento não encontrado', status=422)

      data['investimento'] = investimento

      serializer = MeusInvestimentosSerializer(data = data)
      if not serializer.is_valid():
        return Response(formatErrors(serializer.errors),status=status.HTTP_400_BAD_REQUEST)

      data['usuario'] = Usuario.objects.filter(id=user.get('id')).first()
      serializer.create(data)

      InvestimentosView.associar_usuario(user.get('id'), investimento)
      return HttpResponse(status=201)