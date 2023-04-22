from django.db import models
import datetime
from usuarios.models import Usuario 
# Create your models here.
# Create your models here.

# class TiposMovimentacoes(models.Model):
#   tipo = models.CharField(max_length=255)

class Movimentacoes(models.Model):
  description = models.CharField(max_length=255, default='')
  date = models.DateTimeField(default=datetime.datetime.now)
  value = models.DecimalField(decimal_places=2, max_digits=100)
  # tipo = models.ForeignKey(TiposMovimentacoes,on_delete=models.CASCADE)
  usuario = models.ForeignKey(Usuario, on_delete= models.CASCADE)
  
  REQUIRED_FIELDS = ['date','value','usuario']