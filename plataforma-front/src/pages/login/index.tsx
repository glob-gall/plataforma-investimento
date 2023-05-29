import {TOKEN_KEY, USER_KEY} from "@/constants/constants";
import LoginTemplate from "@templates/login/login.template";
import {parseCookies} from "nookies";
import {GetServerSidePropsContext, NextPage} from "next";
import {User} from "@contexts/auth/auth.types";
import { api } from "@/config/api.config";
import {UserService} from "@/services/user/user.service";

const Login: NextPage<{ user?: User }> = () => {
  return (
      <LoginTemplate/>
  )
}

export default Login;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { [USER_KEY]: user, [TOKEN_KEY]: token } = parseCookies(ctx);

    if(token){
        const userService = new UserService(api(token));
        const { data } = await userService.get();
        return {
            props: {
                user: data
            }
        }
    }

    return {
        props: {
          user: user ? JSON.parse(user) : null
        }
    }
}