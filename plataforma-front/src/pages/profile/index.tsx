import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import ProfileTemplate from "@/templates/profile/profile.template";

import React from "react";
import {withAuthSSR} from "@hocs/withAuthSSR";
import {USER_KEY} from "@constants/constants";
import {parseCookies} from "nookies";

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

export const getServerSideProps = withAuthSSR(async (ctx) => {
    const { [USER_KEY]: user } = parseCookies(ctx);

    return {
        props: {
            user: user ? JSON.parse(user) : null
        }
    }
});