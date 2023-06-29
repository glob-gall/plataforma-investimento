import Box from "@mui/material/Box";
import MainHeaderComponent from "@organisms/headers/MainHeader/MainHeader.component";
import MainDrawerComponent from "@organisms/drawers/MainDrawer/MainDrawer.component";
import React from "react";
import CryptosTemplate from "@templates/cryptos/cryptos.template";
import { CryptosService } from "@/services/cryptos/cryptos.service";
import { api } from "@/config/api.config";
import { TOKEN_KEY } from "@/constants/constants";
import { withAuthSSR } from "@/hocs/withAuthSSR";
import { parseCookies } from "nookies";


const CryptoPage = (props) => {
    return (
        <Box sx={{ display: 'flex', mt: 16, ml: 4, width: "100%" }}>
            <MainHeaderComponent/>
            <MainDrawerComponent/>
            <CryptosTemplate {...props}/>
        </Box>
    )
}

export default CryptoPage;

export const getServerSideProps = withAuthSSR(async ({ user, context }) => {
    const { [TOKEN_KEY]: token } = parseCookies(context);
    const cryptosService = new CryptosService(api(token));
    const { data: cryptos } = await cryptosService.get()
    return {
        props: {
            user,
            cryptos
        }
    }
});