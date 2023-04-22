import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import MovimentacoesTemplate from "@templates/movimentacoes/movimentacoes.template";
import React from "react";

const MovimentacoesPage = () => {
    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <MovimentacoesTemplate/>
        </Box>
    )
}

export default MovimentacoesPage;