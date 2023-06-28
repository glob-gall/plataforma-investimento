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
import * as Containers from './cryptos.container'
import {
    cryptoFormModal
} from "@templates/cryptos/components/cryptos-form-modal/cryptos-form-modal.component";
import cryptoMovimentacoesModal
    from "@templates/cryptos/components/cryptos-movimentacoes-modal/cryptos-movimentacoes-modal.component";
import * as Styles from './cryptos.styles'
import { toBRL } from "@/utils/currency/currency.util";
import Resumocryptos from "./components/Resumo";

const cryptosTemplate = ({ cryptos }) => {
    return (
        <Containers.cryptosContainer>
            {({ formOpen, cryptosFromUser, cryptoDetails, movementOpen, loading, actions }) => (
                <>
                <Styles.Container sx={{ width: '90%' }}>
                    <Box mr={4}>
                        <Typography variant="h5" gutterBottom>cryptos</Typography>
                        <Typography variant="subtitle1" gutterBottom>Aqui você consegue acompanhar todos os seus investimentos em cryptos.</Typography>
                        <Button variant="outlined" startIcon={<Add />} onClick={() => {
                            actions.setFormOpen(true)
                        }}>
                            Adicionar Nova crypto
                        </Button>
                    </Box>

                        {cryptosFromUser.resumo && <Resumocryptos resumo={cryptosFromUser.resumo}/>}
                        <List dense>
                            {cryptosFromUser?.items?.map((item, index) => {
                                return (
                                    <>
                                    <Styles.Item
                                        // sx={{ mt: 1 }}
                                        key={`${item.key}-${index}`}
                                        disablePadding
                                    >
                                        <ListItemButton onClick={ async () => {
                                            await actions.getcryptoDetails(item.key)
                                            await actions.setMovementOpen(true)
                                        }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={item.crypto.logo}
                                                />
                                            </ListItemAvatar>
                                            <Styles.ItemText 
                                                primary={item.crypto.code} 
                                                secondary={
                                                    <Styles.Code>
                                                        {item.crypto.name}
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
                                                            {item.volume_total}x{toBRL(item.crypto.value)}
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
                <cryptoFormModal
                    cryptos={cryptos}
                    open={formOpen}
                    onClose={() => actions.setFormOpen(false)}
                    onSubmit={actions.addcryptoToUser}
                    loading={loading}
                />  
                <cryptoMovimentacoesModal
                    open={movementOpen}
                    details={cryptoDetails}
                    onDelete={actions.deleteFromUser}
                    onClose={() => actions.setMovementOpen(false)}
                    loading={loading}/>
                </>
            )}
        </Containers.cryptosContainer>
    )
}

export default cryptosTemplate;