from django.db import models
import datetime
from crypto.models import Cryptos
from usuarios.models import Usuario
# Create your models here.

class MinhasCryptos(models.Model):
  volume = models.IntegerField()
  valor_compra = models.DecimalField(decimal_places=2, max_digits=100)
  data_movimentacao = models.DateTimeField(default=datetime.date.today)

  crypto = models.ForeignKey(Cryptos, on_delete= models.CASCADE)
  usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  REQUIRED_FIELDS = ['valor_compra','volume']