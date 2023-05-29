from django.db import models
import datetime
from usuarios.contas.models import Contas
from usuarios.models import Usuario
from instituicoes.models import Instituicoes
from django.utils.translation import gettext_lazy as lazy

class Movimentacoes(models.Model):
  class Categoria(models.TextChoices):
    OUTROS = 'OUTROS', lazy('Outros')
    COMIDA = 'COMIDA', lazy('Comida')
    ALUGUEL = 'ALUGUEL', lazy('Aluguel')
    CONTAS = 'CONTAS', lazy('Contas')
    ESTUDOS = 'ESTUDOS', lazy('Estudos')
    ROUPAS = 'ROUPAS', lazy('Roupas')
    CASA = 'CASA', lazy('Casa')
    MEDICO = 'MEDICO', lazy('Médico')
    ENTRETENIMENTO = 'ENTRETENIMENTO', lazy('Entretenimento')
    SALARIO = 'SALARIO', lazy('Salário')
    TRABALHO = 'TRABALHO', lazy('Trabalho')
    TRANSPORTE = 'TRANSPORTE', lazy('Transporte')
    CLIENTE = 'CLIENTE', lazy('Cliente')
    VIAGEM = 'VIAGEM', lazy('Viagem')
  
  description = models.CharField(max_length=255, default='')
  date = models.DateTimeField(default=datetime.datetime.now)
  value = models.DecimalField(decimal_places=2, max_digits=100)
  usuario = models.ForeignKey(Usuario, on_delete= models.CASCADE)
  conta = models.ForeignKey(Contas, on_delete= models.CASCADE,null=True,blank=True,default=None)
  categoria = models.CharField(choices=Categoria.choices, default=Categoria.OUTROS)
  
  REQUIRED_FIELDS = ['date','value','usuario']
