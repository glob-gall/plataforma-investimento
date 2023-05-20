import { CardActionArea, CardContent, CardMedia, Tooltip, Typography } from "@mui/material";
import { Conta } from "../../instituicoes.types";

import * as Styled from './InstituicaoCard.styles'

export interface InstituicaoCardProps{
  conta:Conta,
  onClick: () => void;
}
function InstituicaoCard(props:InstituicaoCardProps) {
  const {
    conta,
    onClick
  } = props

  const {
    agencia='',
    descricao='',
    instituicao,
    digito='',
  } = conta
  
  return (
    <Styled.Container item>
      <Styled.CardWrapper>
          <CardActionArea onClick={onClick}>
            <CardMedia
                component="img"
                height="140"
                image={instituicao?.thumb || 'https://via.placeholder.com/300x200'}
            />
            <CardContent>
                <Tooltip title={instituicao?.nome} arrow placement="top">
                  <Typography gutterBottom variant="h6" component="div" noWrap>
                      {instituicao?.nome}
                  </Typography>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                    Referência: {descricao}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Agência: {agencia}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Conta: {digito}
                </Typography>
            </CardContent>
          </CardActionArea>
      </Styled.CardWrapper>
    </Styled.Container>
  )
}

export default InstituicaoCard