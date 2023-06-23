from django.db import models

# Create your models here.

class Instituicoes(models.Model):
  nome = models.CharField(max_length=255, default='')
  thumb = models.CharField(blank=True, default='')
  codigo = models.IntegerField(blank=True, null=True)
  ispb = models.CharField(max_length=10, default='')

  REQUIRED_FIELDS = ['nome','codigo','ispb']
