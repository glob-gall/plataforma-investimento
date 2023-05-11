import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import InstituicoesTemplate from "@templates/instituicoes/instituicoes.template";
import {withAuthSSR} from "@hocs/withAuthSSR";
import { InstituicoesService } from "@/services/instituicoes/instituicoes.service";
import {GetServerSideProps, NextPage} from "next";
import {InstituicoesInterface} from "@/services/instituicoes/instituices.interface";
import { api } from "@config/api.config";
import {parseCookies} from "nookies";
import {TOKEN_KEY} from "@constants/constants";


const InstituicoesPage: NextPage<{ instituicoes: InstituicoesInterface[] }> = (props) => {

    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <InstituicoesTemplate {...props} />
        </Box>
    )

}

export default InstituicoesPage;

export const getServerSideProps: GetServerSideProps = withAuthSSR(async (ctx) => {
    const { [TOKEN_KEY]: token } = parseCookies(ctx);
    const instituicoesService = new InstituicoesService(api(token));
    const { data: instituicoes } = await instituicoesService.get();
    return {
        props: {
            instituicoes
        }
    }
});