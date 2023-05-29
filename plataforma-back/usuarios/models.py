from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

from instituicoes.models import Instituicoes

# Create your models here.
class Usuario(AbstractUser):
  name = models.CharField(max_length=255)
  birth = models.DateField(default=datetime.date.today)
  email = models.EmailField(max_length=255, unique=True)
  password = models.CharField(max_length=255)
  username = None
  is_email_verified = models.BooleanField(default=False)
  
  instituicoes = models.ManyToManyField(Instituicoes)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name','password','birth']

class Token(models.Model):
  usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  token = models.CharField(max_length=100)

class ResetPasswordCode(models.Model):
  usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
  resetPasswordCode = models.CharField(max_length=100)
