from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from utils.getUserPayload import get_user_payload
from usuarios.models import Usuario
from .models import Movimentacoes
from .serializers import MovimentacoesSerializer
from rest_framework.views import APIView

@api_view(['POST'])
def register_movimentacao(request):
  payload = get_user_payload(request.META.get('HTTP_AUTHORIZATION'))
  findedUser = Usuario.objects.filter(id = payload['id']).first()
  data = request.data
  data['usuario'] = findedUser.id
  
  serializer = MovimentacoesSerializer(data = request.data)
  serializer.is_valid(raise_exception = True)
  serializer.save()
  
  
  
  # return Response(data)
  return Response(serializer.data)

class MovimentacaoView(APIView):
  
  def get(self,request):
    payload = get_user_payload(request.META.get('HTTP_AUTHORIZATION'))
    movimentacoes = Movimentacoes.objects.filter(usuario = payload['id'])
    serializer = MovimentacoesSerializer(movimentacoes,many=True)
    
    return Response(serializer.data)