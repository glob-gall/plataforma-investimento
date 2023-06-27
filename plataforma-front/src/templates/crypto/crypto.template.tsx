import * as Containers from './crypto.container'
import Box from "@mui/material/Box";
import {Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Add, Preview} from "@mui/icons-material";
import {VictoryAxis, VictoryBar, VictoryChart} from "victory";
import {
    InvestimentoFormModal
} from "@templates/investimentos/components/investimento-form-modal/investimento-form-modal.component";
import InvestimentoMovimentacoesModal
    from "@templates/investimentos/components/investimento-movimentacoes-modal/investimento-movimentacoes-modal.component";
import React from "react";

const saldos = [
    {
        "categoria": "IBOV11",
        "saldo": 383
    },
    {
        "categoria": "PETR4",
        "saldo": 383
    },
    {
        "categoria": "PETR5",
        "saldo": 383
    },
]

const CryptoTemplate = () => {
    return (
        <Containers.CryptoContainer>
            {({ formOpen, investimentosFromUser, investimentoDetails, movementOpen, loading, actions }) => (
                <>
                    <Box>
                        <Box mr={4}>
                            <Typography variant="h5" gutterBottom>Criptomoedas</Typography>
                            <Typography variant="subtitle1" gutterBottom>Aqui você consegue acompanhar todas as suas criptomoedas.</Typography>
                            <Button variant="outlined" startIcon={<Add />} onClick={() => {
                                actions.setFormOpen(true)
                            }}>
                                Adicionar Nova criptomoeda
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                            <Box mt={3}>
                                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                    {investimentosFromUser?.map(({investimento, volume}, index) => {
                                        return (
                                            <ListItem
                                                sx={{ mt: 1 }}
                                                key={`${investimento.id}-${index}`}
                                                disablePadding
                                            >
                                                <ListItemButton onClick={ async () => {
                                                    await actions.getInvestimentoDetails(investimento.id)
                                                    await actions.setMovementOpen(true)
                                                }}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            src={investimento.logo}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={investimento.code} />
                                                    <ListItemText primary={investimento.name} sx={{ml: 2}} />
                                                    <ListItemText primary={`Valor atual: ${investimento.value?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`} sx={{ml: 2}} />
                                                    <ListItemText primary={`Volume: ${volume}`} sx={{ml: 2}} />
                                                    <ListItemText primary={`Variação da carteira: -5%`} sx={{ml: 2}} />
                                                    <Preview sx={{ml: 2}}/>
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Box>
                            <Box>
                                <VictoryChart
                                    domainPadding={10}
                                    width={760}
                                >
                                    <VictoryBar
                                        name="Bar-1"
                                        style={{ data: { fill: "#F08080"} }}
                                        labels={({datum}) => `R$ ${Math.abs(datum.saldo).toFixed(2)}`}
                                        data={saldos}
                                        x="categoria"
                                        y="saldo"
                                    />
                                    <VictoryAxis crossAxis={false}/>
                                </VictoryChart>
                            </Box>
                        </Box>
                    </Box>
                    <InvestimentoFormModal
                        // investimentos={investimentos}
                        open={formOpen}
                        onClose={() => actions.setFormOpen(false)}
                        onSubmit={actions.addInvestimentoToUser}
                        loading={loading}
                    />
                    <InvestimentoMovimentacoesModal
                        open={movementOpen}
                        details={investimentoDetails}
                        onDelete={actions.deleteFromUser}
                        onClose={() => actions.setMovementOpen(false)}
                        loading={loading}/>
                </>
            )}
        </Containers.CryptoContainer>

    )
}

export default CryptoTemplate;