from django.db import models
import datetime
from investimentos.models import Investimentos
from usuarios.models import Usuario
# Create your models here.

class MeusInvestimentos(models.Model):
  volume = models.IntegerField()
  valor_compra = models.DecimalField(decimal_places=2, max_digits=100)
  data_movimentacao = models.DateTimeField(default=datetime.date.today)

  investimento = models.ForeignKey(Investimentos, on_delete= models.CASCADE)
  usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  REQUIRED_FIELDS = ['valor_compra','volume']