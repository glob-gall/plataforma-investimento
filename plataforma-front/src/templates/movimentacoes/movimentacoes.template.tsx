import Box from '@mui/material/Box'
import {
  Button,
  IconButton,
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Add,
  Checkroom,
  CreditCard,
  Delete,
  DirectionsCar,
  Fastfood,
  Flight,
  House,
  Kayaking,
  LocalHospital,
  MenuBook,
  MoreHoriz,
  Payments,
  Search,
  Work,
} from '@mui/icons-material'
import React, { ReactElement } from 'react'
import * as Containers from './movimentacoes.container'
import MovimentacoesFormModal from '@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.component'
import DeleteDialog from '@organisms/dialogs/delete-dialog/delete-dialog.component'
import Zoom from '@mui/material/Zoom'
import { formatDatetimeToDateString } from '@utils/date/date.util'

const columns = [
  { id: 'type', label: 'Tipo', minWidth: 24, maxWidth: 24, align: 'left' },
  {
    id: 'date',
    label: 'Data',
    minWidth: 24,
    align: 'left',
    format: (value: string) => formatDatetimeToDateString(value) || '-',
  },
  {
    id: 'description',
    label: `Descrição`,
    minWidth: 24,
    format: (value: string) => value || '-',
  },
  {
    id: 'categoria',
    label: 'Categoria',
    minWidth: 24,
    format: (value: string) => renderCategoryIcon(value) || '-',
  },
  {
    id: 'conta',
    label: 'Conta',
    minWidth: 24,
    format: (value: string) => value?.descricao,
  },
  {
    id: 'value',
    label: 'Valor',
    minWidth: 24,
    maxWidth: 24,
    align: 'center',
    format: (value: number) =>
      value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) ||
      '-',
  },
  {
    id: 'actions',
    label: 'Ações',
    minWidth: 24,
    maxWidth: 24,
    align: 'center',
  },
]

const renderCategoryIcon = (type: string) => {
  return (
    <Tooltip title={type}>
      {({
        OUTROS: <MoreHoriz color="primary" />,
        CONTAS: <CreditCard color="primary" />,
        COMIDA: <Fastfood color="primary" />,
        ALUGUEL: <House color="primary" />,
        ESTUDOS: <MenuBook color="primary" />,
        ROUPAS: <Checkroom color="primary" />,
        CASA: <House color="primary" />,
        MEDICO: <LocalHospital color="primary" />,
        ENTRETENIMENTO: <Kayaking color="primary" />,
        SALARIO: <Payments color="primary" />,
        TRABALHO: <Work color="primary" />,
        TRANSPORTE: <DirectionsCar color="primary" />,
        CLIENTE: <Payments color="primary" />,
        VIAGEM: <Flight color="primary" />,
      }[type] as ReactElement) || null}
    </Tooltip>
  )
}

const MovimentacoesTemplate = (props) => {
  return (
    <Containers.MovimentacoesContainer {...props}>
      {({
        loading,
        movimentacoes,
        formOpen,
        deleteDialogOpen,
        formData,
        formParams,
        actions,
      }) => (
        <>
          <Box flex={1}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom>
                  Movimentações
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Aqui você consegue visualizar todas as movimentações de sua
                  conta
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    actions.setFormData(null)
                    actions.setFormOpen(true)
                  }}
                >
                  Adicionar movimentação
                </Button>
              </Box>
              <Box mr={8}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField label="Buscar movimentação" variant="standard" />
                </Box>
              </Box>
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
                  {movimentacoes.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'type' && (
                                <Tooltip
                                  title={row.value >= 0 ? 'Entrada' : 'Saída'}
                                  placement="right"
                                  arrow
                                  TransitionComponent={Zoom}
                                >
                                  <Payments
                                    color={row.value >= 0 ? 'success' : 'error'}
                                  />
                                </Tooltip>
                              )}
                              {column.id === 'actions' && (
                                <>
                                  <IconButton
                                    aria-label="Excluir"
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                      actions.setFormData(row)
                                      actions.setDeleteDialogOpen(true)
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </>
                              )}
                              <Typography
                                variant="body2"
                                color={value < 0 ? 'primary' : 'danger'}
                              >
                                {column.format ? column.format(value) : value}
                              </Typography>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </Table>
                {loading &&
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <Box mt={index == 0 ? 0 : 1} key={index}>
                        <Skeleton
                          variant="rectangular"
                          height={40}
                          width="100%"
                        />
                      </Box>
                    ))}
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                labelRowsPerPage={'Movimentações por página'}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
                component="div"
                count={movimentacoes.length}
                rowsPerPage={10}
                page={1}
                onPageChange={() => null}
                onRowsPerPageChange={() => null}
              />
            </Box>
          </Box>
          <MovimentacoesFormModal
            open={formOpen}
            onClose={() => actions.setFormOpen(false)}
            onSubmit={actions.onFormSubmit}
            loading={loading}
            formData={formData}
            formParams={formParams}
          />
          <DeleteDialog
            open={deleteDialogOpen}
            onClose={() => actions.setDeleteDialogOpen(false)}
            onConfirm={() => actions.removeMovimentacao(formData.id)}
          />
        </>
      )}
    </Containers.MovimentacoesContainer>
  )
}

export default MovimentacoesTemplate
