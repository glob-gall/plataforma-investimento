import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {TOKEN_KEY, USER_KEY} from "@constants/constants";
import {parseCookies} from "nookies";


export const withAuthSSR = (callbackGetServerSideProps: GetServerSideProps) => {
    return async(context: GetServerSidePropsContext) => {
        const { [TOKEN_KEY]: token, [USER_KEY]: user } = parseCookies(context);
        const parsedUser = user ? JSON.parse(user) : null;
        if(!token || !parsedUser.is_email_verified) {
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