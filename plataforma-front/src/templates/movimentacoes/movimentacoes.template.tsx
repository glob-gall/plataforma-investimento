import Box from '@mui/material/Box'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  FormControl,
  IconButton,
  InputLabel,
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
  DirectionsCar, Edit,
  Fastfood,
  FilterAlt,
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
import * as Styles from './movimentacoes.styles'
import MovimentacoesFormModal from '@templates/movimentacoes/components/movimentacoes-form-modal/movimentacoes-form-modal.component'
import DeleteDialog from '@organisms/dialogs/delete-dialog/delete-dialog.component'
import Zoom from '@mui/material/Zoom'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { formatDatetimeToDateString } from '@utils/date/date.util'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { categoriasMOCK } from '@/services/movimentacoes/categorias.mock'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const renderFilterOptions = (props, handleFilters) => {
  return (
    <Styles.FilterContainer>
      <Styles.SelectFieldsContainer>
        <Styles.SelectFieldWrapper>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Tipo
          </InputLabel>
          <Styles.SelectField
            name="tipo"
            defaultValue={'all'}
            onChange={(ev) => handleFilters(ev.target.value, 'type')}
          >
            <option value={'all'}>Todas</option>
            <option value={'ENTRADA'}>Entrada</option>
            <option value={'SAIDA'}>Saída</option>
          </Styles.SelectField>
        </Styles.SelectFieldWrapper>
        <Styles.SelectFieldWrapper>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Categoria
          </InputLabel>
          <Styles.SelectField
            name="categoria"
            defaultValue={'all'}
            onChange={(ev) => handleFilters(ev.target.value, 'category')}
          >
            <option value={'all'}>Todas</option>
            {categoriasMOCK.map((category, index) => (
              <option key={`${category.key}-${index}`} value={category.key}>
                {category.label}
              </option>
            ))}
          </Styles.SelectField>
        </Styles.SelectFieldWrapper>
        <Styles.SelectFieldWrapper>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Conta
          </InputLabel>
          <Styles.SelectField
            name="conta"
            defaultValue="all"
            onChange={(ev) => handleFilters(ev.target.value, 'account')}
          >
            <option value={'all'}>Todas</option>
            {props.accounts.map((account, index) => (
              <option key={`${account.id}-${index}`} value={account.id}>
                {account.descricao}
              </option>
            ))}
          </Styles.SelectField>
        </Styles.SelectFieldWrapper>
      </Styles.SelectFieldsContainer>

      <Styles.DataFieldsContainer>
        <div>
            <Styles.DataFieldLabel variant="standard">
              Data de início
            </Styles.DataFieldLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Styles.DataField
                  format={'DD/MM/YYYY'}
                  onChange={(ev) => handleFilters(ev?.$d, 'startDate')}
              />
            </LocalizationProvider>
        </div>
        <div>
            <Styles.DataFieldLabel variant="standard">
              Data de fim
            </Styles.DataFieldLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Styles.DataField
                  format={'DD/MM/YYYY'}

                  onChange={(ev) => handleFilters(ev?.$d, 'endDate')}
              />
            </LocalizationProvider>
        </div>
      </Styles.DataFieldsContainer>


    </Styles.FilterContainer>
  )
}

const MovimentacoesTemplate = (props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
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
          <Box sx={{ width: '90%' }}>
            <Box>
              <Box>
                <Typography variant="h5" gutterBottom>
                  Movimentações
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Aqui você consegue visualizar todas as movimentações de sua
                  conta
                </Typography>
                
              </Box>
              <Styles.HeaderContainer>
                <Styles.AddMovimentacao
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => {
                      actions.setFormData(null)
                      actions.setFormOpen(true)
                    }}
                  >
                  Adicionar movimentação
                </Styles.AddMovimentacao>
                <Styles.SearchMovimentacao>
                  <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField label="Buscar movimentação" variant="standard" onChange={(ev) => actions.handleFilters(ev.target.value, 'search')}/>
                </Styles.SearchMovimentacao>
              </Styles.HeaderContainer>
            </Box>

            <Box mb={2} mt={2} p={2} >
            <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >

                  <FilterAlt color="primary" />
                    <Typography variant="h6">Filtros</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box mt={2}>
                    {renderFilterOptions(props, actions.handleFilters)}
                  </Box>
                </AccordionDetails>

            </Accordion>
            </Box>

            <Box sx={{ width: '100%' }}>
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
                  {movimentacoes
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
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
                                      color={
                                        row.value >= 0 ? 'success' : 'error'
                                      }
                                    />
                                  </Tooltip>
                                )}
                                {column.id === 'actions' && (
                                  <>
                                    <IconButton aria-label="Editar" size="small" onClick={() => {
                                      actions.setFormData(row);
                                      actions.setFormOpen(true);
                                    }}><Edit/></IconButton>
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
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
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
