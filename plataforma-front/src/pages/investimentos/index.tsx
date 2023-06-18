import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import InvestimentosTemplate from "@templates/investimentos/investimentos.template";
import { InvestimentosService } from "@/services/investimentos/investimentos.service";
import { api } from "@/config/api.config";
import { TOKEN_KEY } from "@/constants/constants";
import { withAuthSSR } from "@/hocs/withAuthSSR";
import { parseCookies } from "nookies";


const InvestimentosPage = (props) => {
    return (
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <InvestimentosTemplate {...props}/>
        </Box>
    )
}

export default InvestimentosPage;

export const getServerSideProps = withAuthSSR(async ({ user, context }) => {
    const { [TOKEN_KEY]: token } = parseCookies(context);
    const investimentosService = new InvestimentosService(api(token));
    const { data: investimentos } = await investimentosService.get()
    return {
        props: {
            user,
            investimentos
        }
    }
});