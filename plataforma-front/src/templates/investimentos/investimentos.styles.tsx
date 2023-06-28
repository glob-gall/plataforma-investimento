import { Box, ListItem, ListItemText } from '@mui/material'
import styled from 'styled-components'


export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  /* align-items: start; */
  width: 90%;
  padding-right: 26px;
`

export const List = styled(ListItem)`
  display: flex;
  flex-wrap: wrap;
`

export const Item = styled(ListItem)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const ItemText = styled(ListItemText)`
  width: 110px;
  margin-right: 8px;
`

export const ListItemMoney = styled(ListItemText)`
  width: 110px;
  margin-left: 10px;
`

export const Code = styled.p`
  font-size: 0.7rem;
`

export const Entrada = styled.p`
  color: '#03AF0C'
`

export const Saida = styled.p`
  color: '#E40050'
`