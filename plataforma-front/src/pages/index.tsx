import { Button, Container, Stack, TextField, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2}>
        <Typography variant="h1" component="h2" align="center">
          Login
        </Typography>

        <TextField label="Email" variant="outlined" />
        <TextField label="Senha" variant="outlined" />

        <Button variant="contained">Contained</Button>
      </Stack>
    </Container>
  )
}
