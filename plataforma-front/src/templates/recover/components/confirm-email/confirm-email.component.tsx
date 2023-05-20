import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAuth} from "@hooks/auth/use-auth.hook";
import { useRouter } from "next/router";


const ConfirmEmail = () => {
    const { actions: authActions } = useAuth();
    const router = useRouter();

    async function logout(){
        await authActions?.logout();
        router.reload();
    }

    return(
        <Box mt={8} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexFlow: 'column'}}>
            <Typography variant="h5" textAlign="center">Tudo certo com seu cadastro!</Typography>
            <Typography variant="subtitle1" textAlign="center" mt={2}>Seu cadastro está ok, porém para continuar precisamos confirmar seu endereço de email.</Typography>
            <Typography variant="subtitle2" textAlign="center" mt={2} mb={4}>Enviamos um email para você com os passos de confirmação de conta.</Typography>

            <LoadingButton onClick={logout}>
                Voltar ao login
            </LoadingButton>
        </Box>
    )
}

export default ConfirmEmail;