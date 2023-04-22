import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import InstituicoesTemplate from "@templates/instituicoes/instituicoes.template";
import {withAuthSSR} from "@hocs/withAuthSSR";


const InstituicoesPage = () => {

    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <InstituicoesTemplate/>
        </Box>
    )

}

export default InstituicoesPage;

export const getServerSideProps = withAuthSSR(async () => {
    return {
        props: {}
    }
});