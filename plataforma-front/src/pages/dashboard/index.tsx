import DashboardTemplate from "@/templates/dashboard/dashboard.template";
import {NextPage} from "next";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import Box from "@mui/material/Box";
import {withAuthSSR} from "@hocs/withAuthSSR";


const DashboardPage: NextPage = () => {
    return(
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <DashboardTemplate/>
        </Box>
    )
}

export default DashboardPage;

export const getServerSideProps = withAuthSSR(async () => {
    return {
        props: {}
    }
})