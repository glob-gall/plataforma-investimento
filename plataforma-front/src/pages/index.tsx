import { Container, Typography } from '@mui/material'
import {TOKEN_KEY} from "@constants/constants";
import {parseCookies} from "nookies";
import {GetServerSidePropsContext} from "next";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography>Index</Typography>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { [TOKEN_KEY]: token } = parseCookies(context);
    if(!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        redirect: {
            destination: '/dashboard',
            permanent: true
        }
    }
}