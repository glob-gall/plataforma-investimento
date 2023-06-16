import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import InvestimentosTemplate from "@templates/investimentos/investimentos.template";


const InvestimentosPage = () => {
    return (
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <InvestimentosTemplate/>
        </Box>
    )
}

export default InvestimentosPage;