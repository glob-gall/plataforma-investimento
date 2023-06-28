from django.db import models


class Cryptos(models.Model):
    code = models.CharField(max_length=255, default='', unique=True)
    name = models.CharField(max_length=255, default='')
    logo = models.CharField(default='')
    value = models.DecimalField(decimal_places=2, max_digits=100)