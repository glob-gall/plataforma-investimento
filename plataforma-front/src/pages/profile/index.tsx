import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import ProfileTemplate from "@/templates/profile/profile.template";

import React from "react";
import {withAuthSSR} from "@hocs/withAuthSSR";

const MovimentacoesPage = () => {
    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <ProfileTemplate/>
        </Box>
    )
}

export default MovimentacoesPage;

export const getServerSideProps = withAuthSSR(async ({user}) => {
    return {
        props: {
            user
        }
    }
});