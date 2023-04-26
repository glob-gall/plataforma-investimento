import { USER_KEY } from "@/constants/constants";
import LoginTemplate from "@templates/login/login.template";
import {parseCookies} from "nookies";
import {GetServerSidePropsContext, NextPage} from "next";
import {User} from "@contexts/auth/auth.types";

const Login: NextPage<{ user?: User }> = () => {
  return (
      <LoginTemplate/>
  )
}

export default Login;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { [USER_KEY]: user } = parseCookies(ctx);
    
    return {
        props: {
          user: user ? JSON.parse(user) : null
        }
    }
}