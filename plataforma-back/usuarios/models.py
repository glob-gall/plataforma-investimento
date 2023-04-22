from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

from instituicoes.models import Instituicoes

# Create your models here.
class Usuario(AbstractUser):
  name = models.CharField(max_length=255)
  birth = models.DateField(default=datetime.date.today)
  email = models.CharField(max_length=255, unique=True)
  password = models.CharField(max_length=255)
  username = None
  
  instituicoes = models.ManyToManyField(Instituicoes)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name','password','birth']