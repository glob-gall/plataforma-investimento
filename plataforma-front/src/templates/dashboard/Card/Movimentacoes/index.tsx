import { Button, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useAuth } from '@/hooks/auth/use-auth.hook'

function CardMovimentacoes() {
  const { user } = useAuth()
  console.log({ user })

  return (
    <Grid container>
      <Grid container>
        <Grid item style={{ marginRight: 'auto' }}>
          <Typography variant="h4">👋 Bem vindo, {user?.name}!</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="text">ver extrato</Button>
            </Grid>
            <Grid item>
              <Button variant="contained">Nova movimentação</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Typography paragraph>
            Seus problemas financeiros acabaram! 🐷💰
          </Typography>
        </Grid>
      </Grid>

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
