
# Create your views here.
from rest_framework.response import Response

from .models import Instituicoes
from .serializers import InstituicoesSerializer

from rest_framework.views import APIView

class InstituicoesView(APIView):
    def get(self, _):
        instituicoes = Instituicoes.objects.all()
        serializer = InstituicoesSerializer(instituicoes, many=True)
        return Response(serializer.data)
