
def formatMsg(key,value):
  val = value.lower()
  if  val == 'este campo é obrigatório.':
    return {'message': val.replace("este campo", key)}
  elif val == 'insira um endereço de email válido.':
    return {'message': "Insira um endereço de email válido."}
  
  return {'message': {key:val}}


def formatErrors(errors:dict):
  msgs = []
  
  for key,value in errors.items():
    msg = formatMsg(key,value[0].title())
    msgs.append(msg)
    
  return {'errors':msgs}