import handeEmoji from '@/utils/emojis/handEmoji'
import PigEmoji from '@/utils/emojis/pigEmoji'
import { Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function CardMovimentacoes() {
  const [emoji,setEmoji] = useState('')
  const [hand,setHand] = useState('')
  
  useEffect(()=>{
    setEmoji(PigEmoji()+PigEmoji())
    setHand(handeEmoji())
  },[setEmoji])
  return (
    <Grid container>
      <Grid container>
        <Grid item style={{ marginRight: 'auto' }}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">{hand} Bem vindo, {'aaa'}!</Typography>
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
            <Grid item>
              <Link href="/movimentacoes">
                <Button variant="text">ver extrato</Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained">Nova movimentação</Button>
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
            R$ 152,20
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="caption">Entradas</Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', color: '#03AF0C' }}
          >
            R$ 352,20
          </Typography>
        </Grid>
        <Grid item direction="column">
          <Typography variant="caption">Saidas</Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', color: '#E40050' }}
          >
            R$ 200,00
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardMovimentacoes
