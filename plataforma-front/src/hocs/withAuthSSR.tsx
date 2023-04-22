import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {TOKEN_KEY} from "@constants/constants";
import {parseCookies} from "nookies";


export const withAuthSSR = (callbackGetServerSideProps: GetServerSideProps) => {
    return async(context: GetServerSidePropsContext) => {
        const { [TOKEN_KEY]: token } = parseCookies(context);
        if(!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        return callbackGetServerSideProps(context);
    }
}