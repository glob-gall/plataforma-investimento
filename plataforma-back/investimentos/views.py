from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer
from .serializers import InvestimentosSerializer
from .models import Investimentos
from utils.errors import formatErrors,ResponseError

class InvestimentosView(APIView):
    @staticmethod
    def associar_usuario(usuario, investimento):
        usuario = Usuario.objects.filter(id=usuario).first()
        usuario.investimentos.add(investimento)
        usuario.save()

    def get(self, _):
        investimentos = Investimentos.objects.all().order_by('name')
        serializer = InvestimentosSerializer(investimentos, many=True)
        return Response(serializer.data)
    
    def sync(self):
        data = requests.get("https://brapi.dev/api/quote/list?sortBy=close&sortOrder=desc")
        data = data.json()
        for stock in data['stocks']:
            Investimentos.objects.update_or_create(
                code=stock['stock'],
                name=stock['name'],
                logo=stock['logo'],
                value=stock['close']
            )
        return data