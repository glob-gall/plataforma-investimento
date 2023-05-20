import {Button, Skeleton, Grid, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Add} from "@mui/icons-material";
import InstituicoesFormModal
    from "@templates/instituicoes/components/instituicoes-form-modal/instituicoes-form-modal.component";
import React from "react";
import {InstituicoesTemplateProps} from "@templates/instituicoes/instituicoes.types";
import * as Containers from '@templates/instituicoes/instituicoes.container';
import InstituicaoCard from "./components/InstituicaoCard/InstituicaoCard.template copy";

import * as Styled from './instituicoes.styles'

const InstituicoesTemplate: React.FC<InstituicoesTemplateProps> = (props) => {

    return (
        <Containers.InstituicoesContainer>
            {
                ({ instituicoesFromUser, formOpen, formData, loading, actions }) => (
                    <Styled.Container>
                    <Box>
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
                            <Box>
                                <Styled.CardContainer container spacing={2}>
                                    {
                                        !loading && instituicoesFromUser.length === 0 &&
                                        <Box>
                                            <Typography variant="subtitle1" gutterBottom>Você ainda não possui instituições vinculadas à sua conta.</Typography>
                                        </Box>
                                    }
                                    {
                                        !loading ?
                                        instituicoesFromUser.map((item) => (
                                            <InstituicaoCard
                                                key={`${item.id}-${item.instituicao?.nome}`}
                                                conta={item}
                                                onClick={() => {
                                                    actions.setFormOpen(true)
                                                    actions.addFormData(item)
                                                }}
                                            />
                                        ))
                                        :
                                        Array(8).fill("").map((_, index) => (
                                            <Grid my={2} sm={2} md={4} key={"skl-"+index} width="100%">
                                                <Skeleton variant="rectangular" width={320} height={240} />
                                            </Grid>
                                        ))
                                    }
                                </Styled.CardContainer>
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
                </Styled.Container>
                )
            }
        </Containers.InstituicoesContainer>
    )
}

export default InstituicoesTemplate