from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer
from .serializers import CryptosSerializer
from .models import Cryptos
from utils.errors import formatErrors,ResponseError

class CryptosView(APIView):
    @staticmethod
    def associar_usuario(usuario, crypto):
        usuario = Usuario.objects.filter(id=usuario).first()
        usuario.cryptos.add(crypto)
        usuario.save()

    def get(self, _):
        cryptos = Cryptos.objects.all().order_by('name')
        serializer = CryptosSerializer(cryptos, many=True)
        # self.sync()
        return Response(serializer.data)
    
    def sync(self):
        data = requests.get("https://brapi.dev/api/v2/crypto?coin=BTC%2CETH&currency=BRL")
        data = data.json()
        for stock in data['coins']:
            try:
                obj = Cryptos.objects.get(coin=stock['coin'])
                for key, value in stock.items():
                    setattr(obj, key, value)
                obj.save()
            except Cryptos.DoesNotExist:
                new_values = {
                    'coin':stock['coin'],
                    'name':stock['coinName'],
                    'logo':stock['coinImageUrl'],
                    'value':stock['regularMarketPrice']
                }
                obj = Cryptos(**new_values)
                obj.save()

        return data