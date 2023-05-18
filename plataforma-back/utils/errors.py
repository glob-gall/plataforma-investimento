from rest_framework.response import Response
from rest_framework import status

def formatMsg(key,value):
  val = value.lower()
  if  val == 'este campo é obrigatório.':
    return {'message': val.replace("este campo", key)}
  elif val == 'insira um endereço de email válido.':
    return {'message': "Insira um endereço de email válido."}
  
  return {'message':  f'{key} - {val}'}


def formatErrors(errors:dict):
  try:
    msgs = []
    
    for key,value in errors.items():
      msg = formatMsg(key,value[0].title())
      msgs.append(msg)
      
    return {'errors':msgs}
  except:
    return ResponseError('Ocorreu um erro inesperado :(',status.HTTP_500_INTERNAL_SERVER_ERROR)


def strToErr(errors):
  errs=[]
  for err in errors:
    errs.append({'message':err})
  return {'errors':errs}
  
def ResponseError(err,status=status.HTTP_400_BAD_REQUEST):
  if(type(err) is list):
    return Response(strToErr(err),status=status)
  return Response({'errors':{'message':err}},status=status)
