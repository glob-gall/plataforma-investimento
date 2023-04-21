# passar request.META.get('HTTP_AUTHORIZATION') como parametro
from rest_framework.exceptions import AuthenticationFailed
import jwt

SECRET= 'SECRET'

def get_user_payload(token):
  if not token:
    raise AuthenticationFailed('Não autorizado')
  
  token = str.replace(str(token), 'Bearer ', '')
  try:
    payload = jwt.decode(token,SECRET,algorithms=['HS256'])
  except:
    raise AuthenticationFailed('Não autorizado')
  
  return payload