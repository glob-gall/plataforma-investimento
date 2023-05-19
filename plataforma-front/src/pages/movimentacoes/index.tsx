import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import MovimentacoesTemplate from "@templates/movimentacoes/movimentacoes.template";
import React from "react";
import {withAuthSSR} from "@hocs/withAuthSSR";
import {TOKEN_KEY} from "@constants/constants";
import {parseCookies} from "nookies";
import {InstituicoesService} from "@/services/instituicoes/instituicoes.service";
import {api} from "@config/api.config";

const MovimentacoesPage = (props) => {
    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <MovimentacoesTemplate {...props}/>
        </Box>
    )
}

export default MovimentacoesPage;

export const getServerSideProps = withAuthSSR(async (ctx) => {
    const { [TOKEN_KEY]: token } = parseCookies(ctx);
    const instituicoesService = new InstituicoesService(api(token));
    const { data: accounts } = await instituicoesService.getAddedToUser();
    return {
        props: {
            accounts
        }
    }
});