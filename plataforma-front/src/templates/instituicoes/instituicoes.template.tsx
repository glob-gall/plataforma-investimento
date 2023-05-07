import {Button, Card, CardActionArea, CardContent, CardMedia, Skeleton, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Add} from "@mui/icons-material";
import InstituicoesFormModal
    from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.component";
import React from "react";
import {InstituicoesTemplateProps} from "@templates/instituicoes/instituicoes.types";
import * as Containers from '@templates/instituicoes/instituicoes.container';

const InstituicoesTemplate: React.FC<InstituicoesTemplateProps> = (props) => {

    return (
        <Containers.InstituicoesContainer>
            {
                ({ instituicoesFromUser, formOpen, formData, loading, actions }) => (
                    <>
                    <Box flex={1}>
                        <Box>
                            <Typography variant="h5" gutterBottom>Instituições</Typography>
                            <Typography variant="subtitle1" gutterBottom>Aqui você consegue visualizar todas as instituições vinculadas à sua conta.</Typography>
                            <Button variant="outlined" startIcon={<Add />} onClick={() => {
                                actions.setFormData(null)
                                actions.setFormOpen(true)
                            }}>
                                Adicionar Nova Instituição
                            </Button>
                        </Box>
                        {
                            <Box mt={4}>
                                <Grid container columns={{ xs: 2, sm: 8, md: 16 }}>
                                    {
                                        !loading && instituicoesFromUser.length === 0 &&
                                        <Box>
                                            <Typography variant="subtitle1" gutterBottom>Você ainda não possui instituições vinculadas à sua conta.</Typography>
                                        </Box>
                                    }
                                    {
                                        !loading ?
                                        instituicoesFromUser.map((item: any) => (
                                            <Grid my={2} sm={2} md={4} key={`${item.id}-${item.instituicao?.nome}`} width="100%">
                                                <Card sx={{ maxWidth: 320, minWidth: 320 }}>
                                                    <CardActionArea onClick={() => {
                                                        actions.setFormOpen(true)
                                                        actions.addFormData(item)
                                                    }}>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={item.instituicao?.thumb || 'https://via.placeholder.com/300x200'}
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {item.instituicao?.nome}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Referência: {item.descricao}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Agência: {item.agencia}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Conta: {item.conta} - {item.digito}
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        ))
                                        :
                                        Array(8).fill("").map((_, index) => (
                                            <Grid my={2} sm={2} md={4} key={"skl-"+index} width="100%">
                                                <Skeleton variant="rectangular" width={320} height={240} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Box>
                        }
                    </Box>
                    <InstituicoesFormModal
                        open={formOpen}
                        onClose={() => actions.setFormOpen(false)}
                        onDelete={actions.onModalDelete}
                        formData={formData}
                        loading={loading}
                        onSubmit={actions.onModalSubmit}
                        instituicoes={props.instituicoes}
                    />
                </>

                )
            }
        </Containers.InstituicoesContainer>
    )
}

export default InstituicoesTemplate