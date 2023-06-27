import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import CryptoTemplate from "@templates/crypto/crypto.template";


const CryptoPage = (props) => {
    return (
        <Box sx={{display: 'flex', mt: 16, ml: 4, width: "100%"}}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <CryptoTemplate {...props}/>
        </Box>
    );
}

export default CryptoPage;