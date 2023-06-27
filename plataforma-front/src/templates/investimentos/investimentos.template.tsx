import Box from "@mui/material/Box";
import {
    Avatar,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import {Add, VisibilityOutlined} from "@mui/icons-material";
import React from "react";
import * as Containers from './investimentos.container'
import {
    InvestimentoFormModal
} from "@templates/investimentos/components/investimento-form-modal/investimento-form-modal.component";
import InvestimentoMovimentacoesModal
    from "@templates/investimentos/components/investimento-movimentacoes-modal/investimento-movimentacoes-modal.component";
import {VictoryAxis, VictoryBar, VictoryChart} from "victory";
import * as Styles from './investimentos.styles'
import { toBRL } from "@/utils/currency/currency.util";
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

const InvestimentosTemplate = ({ investimentos }) => {
    return (
        <Containers.InvestimentosContainer>
            {({ formOpen, investimentosFromUser, investimentoDetails, movementOpen, loading, actions }) => (
                <>
                <Box>
                    <Box mr={4}>
                        <Typography variant="h5" gutterBottom>Investimentos</Typography>
                        <Typography variant="subtitle1" gutterBottom>Aqui você consegue acompanhar todos os seus investimentos.</Typography>
                        <Button variant="outlined" startIcon={<Add />} onClick={() => {
                            actions.setFormOpen(true)
                        }}>
                            Adicionar Novo investimento
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                        <Box mt={3}>
                            <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {investimentosFromUser?.map((item, index) => {
                                    return (
                                        <>
                                        <ListItem
                                            sx={{ mt: 1 }}
                                            key={`${item.key}-${index}`}
                                            disablePadding
                                        >
                                            <ListItemButton onClick={ async () => {
                                                await actions.getInvestimentoDetails(item.key)
                                                await actions.setMovementOpen(true)
                                            }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={item.investimento.logo}
                                                    />
                                                </ListItemAvatar>
                                                <Styles.ListItem 
                                                    primary={item.investimento.code} 
                                                    secondary={
                                                        <Styles.Code>
                                                            {item.investimento.name}
                                                        </Styles.Code>
                                                        }
                                                />
                                                <Tooltip title="Preço médio" arrow placement="top-start">
                                                    <Styles.ListItemMoney 
                                                        primary={toBRL(item.volume_total*item.valor_medio_compra)} 
                                                        secondary={
                                                            <Styles.Code>
                                                                {item.volume_total}x{toBRL(item.valor_medio_compra)}
                                                            </Styles.Code>
                                                        }
                                                    />
                                                </Tooltip>

                                                <Tooltip title="Retorno" arrow placement="top-start">
                                                    <Styles.ListItemMoney 
                                                        primary={item.retorno > 0 
                                                            ?<Styles.Entrada style={{ fontWeight: 'bold', color: '#03AF0C' }}>{toBRL(item.retorno)}</Styles.Entrada>
                                                            :<Styles.Saida style={{ fontWeight: 'bold', color: '#E40050' }}>{toBRL(item.retorno)}</Styles.Saida>
                                                            } 
                                                        secondary={
                                                            <Styles.Code>
                                                                {item.volume_total}x{toBRL(item.investimento.value)}
                                                            </Styles.Code>
                                                        }
                                                    />
                                                </Tooltip>
                                                
                                                <VisibilityOutlined sx={{ml: 2}}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                        </>
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
                    investimentos={investimentos}
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
        </Containers.InvestimentosContainer>
    )
}

export default InvestimentosTemplate;