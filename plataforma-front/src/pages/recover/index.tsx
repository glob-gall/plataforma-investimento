import { USER_KEY } from "@/constants/constants";
import RecoverTemplate from "@templates/recover/recover.template";
import {parseCookies} from "nookies";
import {GetServerSidePropsContext, NextPage} from "next";
import {User} from "@contexts/auth/auth.types";

const Recover: NextPage<{ user?: User }> = () => {
  return (
      <RecoverTemplate/>
  )
}

export default Recover;