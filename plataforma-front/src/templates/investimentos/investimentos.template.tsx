import Box from "@mui/material/Box";
import {
    Avatar,
    Button,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
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
import * as Styles from './investimentos.styles'
import { toBRL } from "@/utils/currency/currency.util";
import ResumoInvestimentos from "./components/Resumo";

const InvestimentosTemplate = ({ investimentos }) => {
    return (
        <Containers.InvestimentosContainer>
            {({ formOpen, investimentosFromUser, investimentoDetails, movementOpen, loading, actions }) => (
                <>
                <Styles.Container>
                    <Box mr={4}>
                        <Typography variant="h5" gutterBottom>Investimentos</Typography>
                        <Typography variant="subtitle1" gutterBottom>Aqui você consegue acompanhar todos os seus investimentos.</Typography>
                        <Button variant="outlined" startIcon={<Add />} onClick={() => {
                            actions.setFormOpen(true)
                        }}>
                            Adicionar Novo investimento
                        </Button>
                    </Box>

                        {investimentosFromUser.resumo && <ResumoInvestimentos resumo={investimentosFromUser.resumo}/>}
                        <List dense>
                            {investimentosFromUser?.items?.map((item, index) => {
                                return (
                                    <>
                                    <Styles.Item
                                        // sx={{ mt: 1 }}
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
                                            <Styles.ItemText 
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
                                                        ?<Styles.Entrada style={{ fontWeight: 'bold', color: '#03AF0C' }}>+{toBRL(item.retorno)}</Styles.Entrada>
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
                                    </Styles.Item>
                                    <Divider />
                                    </>
                                );
                            })}
                        </List>
        
                </Styles.Container>
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