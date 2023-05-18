import Box from "@mui/material/Box";
import {Button, IconButton, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography} from "@mui/material";
import {Add, Delete, Edit, Payments} from "@mui/icons-material";
import React from "react";


const columns = [
    { id: 'type', label: 'Tipo', minWidth: 24, maxWidth: 24, align: 'left' },
    { id: 'date', label: 'Data', minWidth: 24 },
    { id: 'description', label: `Descrição`, minWidth: 24 },
    { id: 'category', label: 'Categoria', minWidth: 24 },
    { id: 'source', label: 'Conta', minWidth: 24},
    {
        id: 'value',
        label: 'Valor',
        minWidth: 24,
        maxWidth: 24,
        align: 'center',
        format: (value: number) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    },
    { id: 'actions', label: 'Ações', minWidth: 24, maxWidth: 24, align: 'center' },
];

const rows = [
    { type: 'Saída', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: -1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Saída', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: -1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },
    { type: 'Entrada', date: '10/10/2021', description: 'Salário', category: 'Salário', source: 'Conta corrente', value: 1000 },

];

const MovimentacoesTemplate = () => {
    return (
        <Box flex={1}>
            <Box>
                <Typography variant="h5" gutterBottom>Movimentações</Typography>
                <Typography variant="subtitle1" gutterBottom>Aqui você consegue visualizar todas as movimentações de sua conta</Typography>
                <Button variant="outlined" startIcon={<Add />} onClick={() => null}>
                    Adicionar movimentação
                </Button>
            </Box>
            <Box flex={1}>
                <TableContainer sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {rows
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id === 'type' &&
                                                        <Payments color={value == 'Entrada' ? 'success' : 'error' } />
                                                    }
                                                    {
                                                        column.id === 'actions' && (
                                                        <>
                                                            <IconButton aria-label="Editar" size="small" onClick={() => null}><Edit/></IconButton>
                                                            <IconButton aria-label="Excluir" color="error" size="small" onClick={() => null}><Delete/></IconButton>
                                                        </>
                                                        )
                                                    }
                                                    <Typography variant="body2" color={value < 0 ? 'primary' : 'danger'}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </Typography>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    labelRowsPerPage={'Movimentações por página'}
                    component="div"
                    count={rows.length}
                    rowsPerPage={1}
                    page={1}
                    onPageChange={() => null}
                    onRowsPerPageChange={() => null}
                />
            </Box>
        </Box>
    )
}

export default MovimentacoesTemplate