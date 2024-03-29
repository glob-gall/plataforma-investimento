import handeEmoji from '@/utils/emojis/handEmoji'
import moneyEmoji from '@/utils/emojis/moneyEmoji'
import pigEmoji from '@/utils/emojis/pigEmoji'

import { Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {useAuth} from "@hooks/auth/use-auth.hook";
import { MovimentacoesService } from '@/services/movimentacoes/movimentacoes.service'
import { Nullable, Saldos } from '@/services/movimentacoes/movimentacoes.interface'


function CardMovimentacoes() {
  const { user } = useAuth()
  const [emoji,setEmoji] = useState('')
  const [hand,setHand] = useState('')
  const [saldos,setSaldos] = useState<Saldos>({
    entradas:0,
    saidas:0,
    total:0
  })
  let movimentacoesService:Nullable<MovimentacoesService> = null

  useEffect(()=>{
    movimentacoesService = new MovimentacoesService()
  },[])
  
  useEffect(()=>{
    const loadMovimentacoes = async ()=>{
      if (!movimentacoesService) return
      try {
        const {data} = await movimentacoesService.getSaldo()
        setSaldos(data)
      } catch (error) {
        console.log({error});
      }
    }
    loadMovimentacoes()
  },[movimentacoesService])

  useEffect(()=>{
    setEmoji(pigEmoji()+moneyEmoji())
    setHand(handeEmoji())
  },[setEmoji])
  return (
    <Grid container>
      <Grid container>
        <Grid item style={{ marginRight: 'auto' }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">{hand} Bem vindo, {user?.name}!</Typography>
            </Grid>
            <Grid item>
              <Typography paragraph>
                Seus problemas financeiros acabaram! {emoji}
              </Typography>
            </Grid>
          </Grid>
        
        
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            {/* <Grid item>
                <Button variant="text">ver movimentações</Button>
              </Grid> */}
            <Grid item>
              <Link href="/movimentacoes">
                <Button variant="contained">Ver movimentações</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container>
        
      </Grid> */}

      <Grid container spacing={3} style={{ marginTop: 12 }}>
        <Grid item style={{ marginRight: 'auto' }} />

        <Grid item direction="column">
          <Typography variant="caption">saldo atual</Typography>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            R$ {saldos.total?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="caption">Entradas</Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', color: '#03AF0C' }}
          >
            R$ {saldos.entradas?.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="caption">Saidas</Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', color: '#E40050' }}
          >
            R$ {saldos.saidas?.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardMovimentacoes
