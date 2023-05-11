from django.db import models
import datetime
from instituicoes.models import Instituicoes
from usuarios.models import Usuario
# Create your models here.

class Contas(models.Model):
  descricao = models.CharField(max_length=255, blank=True, default='')
  numero = models.CharField(max_length=10, null=False)
  digito = models.IntegerField()
  agencia = models.CharField(max_length=10, null=False)

  instituicao = models.ForeignKey(Instituicoes, on_delete= models.CASCADE)
  usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  REQUIRED_FIELDS = ['numero','digito','agencia','instituicao']