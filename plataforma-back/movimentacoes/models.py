from django.db import models
import datetime
from usuarios.contas.models import Contas
from usuarios.models import Usuario
from instituicoes.models import Instituicoes

class Movimentacoes(models.Model):
  description = models.CharField(max_length=255, default='')
  date = models.DateTimeField(default=datetime.datetime.now)
  value = models.DecimalField(decimal_places=2, max_digits=100)
  usuario = models.ForeignKey(Usuario, on_delete= models.CASCADE)
  conta = models.ForeignKey(Contas, on_delete= models.CASCADE,null=True,blank=True,default=None)
  
  REQUIRED_FIELDS = ['date','value','usuario']
