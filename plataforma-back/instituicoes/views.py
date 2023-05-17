
# Create your views here.
from django.http import HttpResponseNotFound
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from utils.errors import ResponseError
from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer

from .models import Instituicoes
from .serializers import InstituicoesSerializer


class InstituicoesView(APIView):

    @staticmethod
    def associar_usuario(usuario, instituicao):
        usuario = Usuario.objects.filter(id=usuario).first()
        usuario.instituicoes.add(instituicao)
        usuario.save()

    def get(self, _):
        instituicoes = Instituicoes.objects.all().order_by('nome')
        serializer = InstituicoesSerializer(instituicoes, many=True)
        return Response(serializer.data)
    
    @api_view(['POST'])
    def associar_instituicao_usuario(request, pk):
        user = request.auth_payload
        instituicao = Instituicoes.objects.filter(id=pk).first()

        if not instituicao:
            return ResponseError('Instituião não encontrada')

        serializer = UsuarioSerializer(InstituicoesView.associar_usuario(user['id'], instituicao))
        return Response(serializer.data)


        
