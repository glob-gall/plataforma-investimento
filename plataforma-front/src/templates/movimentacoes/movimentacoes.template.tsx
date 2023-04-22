import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import React from "react";


const MovimentacoesTemplate = () => {
    return (
        <Box>
            <Box>
                <Typography variant="h5" gutterBottom>Movimentações</Typography>
                <Typography variant="subtitle1" gutterBottom>Aqui você consegue visualizar todas as movimentações de sua conta</Typography>
                <Button variant="outlined" startIcon={<Add />} onClick={() => null}>
                    Adicionar movimentação
                </Button>
            </Box>
        </Box>
    )
}

export default MovimentacoesTemplate