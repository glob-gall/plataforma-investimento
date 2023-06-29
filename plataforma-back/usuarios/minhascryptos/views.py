from django.shortcuts import render
from django.http import HttpResponse
from itertools import groupby

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count

from .models import MinhasCryptos
from .serializers import MinhasCryptosSerializer,MinhasCryptosGroupSerializer

from crypto.models import Cryptos
from usuarios.models import Usuario

from crypto.views import CryptosView

class MinhasCryptosView(APIView):

  class CryptoView(APIView):
    def crypto_by_id(self, pk, user_id):
      return MinhasCryptos.objects.filter(id=pk, usuario=user_id).first()

    def delete(self, request, pk):
      user = request.auth_payload

      crypto = MinhasCryptos.objects.filter(id=pk, usuario=user.get('id')).first()
      if not crypto:
        return HttpResponse('Criptomoeda não encontrada', status=404)

      crypto.delete()
      return Response(status=204)

  @staticmethod
  def crypto_query(**data):
    return Cryptos.objects.filter(
      valor_compra=data.get('valor_compra'),
      volume=data.get('volume'),
      data_movimentacao=data.get('data_movimentacao'),
      crypto=data.get('crypto'),
      usuario=data.get('usuario'))

  def get(self, request):
    payload = request.auth_payload

    id = request.query_params.get('id')

    if id:
        cryptos = MinhasCryptos.objects.filter(usuario__id = payload['id'], crypto_id = id).select_related('crypto').all()  
        serializer = MinhasCryptosSerializer(cryptos, many=True)
        return Response(serializer.data)

    cryptos = MinhasCryptos.objects.filter(usuario__id = payload['id']).select_related('crypto').annotate(volumes=Count("crypto"))
    serializer = MinhasCryptosSerializer(cryptos, many=True)
    cryptos = serializer.data
    def cryptosGroup(compra):
      return compra['crypto']['id']
    
    items=[]
    resumo = {
      'carteira':0,
      'retorno_total':0
    }
    for key, group in groupby(cryptos, cryptosGroup):
      
      volumeTotal = 0
      valorTotal = 0
      crypto = {
        'name':'',
        'logo':'',
        'code':'',
        'value':0.0
      }
      for compra in group:
        valorTotal += float(compra['volume']) * float(compra['valor_compra'])
        volumeTotal += int(compra['volume'])
        crypto['name'] = compra['crypto']['name']
        crypto['value'] = compra['crypto']['value']
        crypto['logo'] = compra['crypto']['logo']
        crypto['code'] = compra['crypto']['code']


      totalAtual = float(crypto['value']) * volumeTotal
      totalPago = (valorTotal/volumeTotal)*volumeTotal

      resumo['carteira']+= totalAtual
      resumo['retorno_total']+= (totalAtual - totalPago)
      items.append({
        'key': key,
        'volume_total': volumeTotal,
        'valor_medio_compra': valorTotal/volumeTotal,
        'crypto':crypto,
        'retorno':totalAtual - totalPago
      })
  

    return Response({
      'resumo':resumo,
      'items':items
    })  
  
  def post(self, request):
      user = request.auth_payload
      data = request.data
      data['usuario'] = user.get('id')

      crypto = Cryptos.objects.filter(id=data['crypto']).first()

      if not crypto:
        return HttpResponse('Crypto não encontrada', status=422)

      data['crypto'] = crypto

      serializer = MinhasCryptosSerializer(data = data)
      serializer.is_valid(raise_exception = True)

      data['usuario'] = Usuario.objects.filter(id=user.get('id')).first()
      serializer.create(data)

      CryptosView.associar_usuario(user.get('id'), crypto)
      return HttpResponse(status=201)