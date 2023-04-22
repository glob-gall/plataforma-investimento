from django.db import models

# Create your models here.

class Instituicoes(models.Model):
  nome = models.CharField(max_length=255, default='')
  codigo = models.IntegerField()
  ispb = models.CharField(max_length=10, default='')

  REQUIRED_FIELDS = ['nome','codigo','ispb']