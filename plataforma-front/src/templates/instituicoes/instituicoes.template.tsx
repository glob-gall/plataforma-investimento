import {Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Add} from "@mui/icons-material";
import InstituicoesFormModal
    from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.component";
import React from "react";

const InstituicoesTemplate = () => {

    const [formOpen, setFormOpen] = React.useState(false)

    return (
        <>
        <Box>
            <Box>
                <Typography variant="h5" gutterBottom>Instituições</Typography>
                <Typography variant="subtitle1" gutterBottom>Aqui você consegue visualizar todas as instituições vinculadas à sua conta.</Typography>
                <Button variant="outlined" startIcon={<Add />} onClick={() => setFormOpen(true)}>
                    Adicionar Nova Instituição
                </Button>
            </Box>
            <Box mt={4}>
                <Grid container columns={{ xs: 2, sm: 8, md: 16 }}>
                    {
                        [1,2,3,4,5,6].map((item, index) => (
                            <Grid my={2} sm={2} md={4} key={index}>
                                <Card sx={{ maxWidth: 320 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="https://senhorviagens.com/wp-content/uploads/2022/03/1-4-1024x590.jpg"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Itaú
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Referência: minha conta
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Agência: 0333
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Conta: 0333
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
        <InstituicoesFormModal open={formOpen} onClose={() => setFormOpen(false)}/>
        </>
    )
}

export default InstituicoesTemplate