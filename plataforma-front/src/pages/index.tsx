import { Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography>Index</Typography>
    </Container>
  )
}

export async function getServerSideProps() {
    return {
        redirect: {
            destination: '/login',
            permanent: true
        }
    }
}