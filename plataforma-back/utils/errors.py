
def formatMsg(key,value):
  if  value == 'Este Campo É Obrigatório.':
    return {'message': value.replace("Este Campo", key)}
  elif value == 'Insira Um Endereço De Email Válido.':
    return {'message': "Insira Um Endereço De Email Válido."}
  
  return {'message': {key:value}}


def formatErrors(errors:dict):
  msgs = []
  
  for key,value in errors.items():
    msg = formatMsg(key,value[0].title())
    msgs.append(msg)
    
  return {'errors':msgs}