
# Create your views here.
from django.http import HttpResponseNotFound
from rest_framework.response import Response

from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer

from .models import Instituicoes
from .serializers import InstituicoesSerializer

from rest_framework.decorators import api_view
from rest_framework.views import APIView

class InstituicoesView(APIView):
    def get(self, _):
        instituicoes = Instituicoes.objects.all()
        serializer = InstituicoesSerializer(instituicoes, many=True)
        return Response(serializer.data)
    
    @api_view(['POST'])
    def associar_instituicao_usuario(request, pk):
        user = request.auth_payload
        instituicao = Instituicoes.objects.filter(id=pk).first()
        usuario = Usuario.objects.filter(id=user['id']).first()

        if not instituicao:
            return HttpResponseNotFound("Instituição não encontrada")

        usuario.instituicoes.add(instituicao)
        usuario.save()

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)
        return  Response(serializer.data)


        
