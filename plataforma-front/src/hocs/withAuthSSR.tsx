import {GetServerSidePropsContext} from "next";
import {TOKEN_KEY} from "@constants/constants";
import {parseCookies} from "nookies";
import { UserService } from "@/services/user/user.service";
import { api } from "@/config/api.config";


export interface CallbackGetServerSideProps {
    ({context, user}: any): Promise<any>
}

export const withAuthSSR = (callbackGetServerSideProps: CallbackGetServerSideProps) => {
    return async(context: GetServerSidePropsContext) => {
        const { [TOKEN_KEY]: token } = parseCookies(context);

        const userService = new UserService(api(token));
        try{
            const { data: user } = await userService.get();
            if(!token || !user?.is_email_verified) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
            return await callbackGetServerSideProps({context, user});
        }catch(err){
            // return {
            //     redirect: {
            //         destination: '/login',
            //         permanent: false
            //     }
            // }
        }


    }
}