import { Container, Typography } from '@mui/material'
import {TOKEN_KEY, USER_KEY} from "@constants/constants";
import {parseCookies} from "nookies";
import {GetServerSidePropsContext} from "next";

export default function Home() {
  return (
    <>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { [TOKEN_KEY]: token, [USER_KEY]: user } = parseCookies(context);
    const parsedUser = user ? JSON.parse(user) : null;
    if(!token || !parsedUser.is_email_verified) {
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