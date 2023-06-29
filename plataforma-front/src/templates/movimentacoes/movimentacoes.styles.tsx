import { Button, FormControl, InputLabel, NativeSelect } from '@mui/material'
import { DateField, DateFieldProps } from '@mui/x-date-pickers'
import styled from 'styled-components'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export const DateInput = styled(DateField)<
  DateFieldProps<any> & { error: boolean }
>``

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`
export const SearchMovimentacao = styled.div`
  display: flex;
  align-items: flex-end;
  margin:0 16px 16px;
`
export const AddMovimentacao = styled(Button)`
  margin-right:16px;
`

export const SelectFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: auto;
  align-items: center;
`
export const DataFieldsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const SelectField = styled(NativeSelect)`
`

export const SelectFieldWrapper = styled(FormControl)`
  margin: 16px 4px 0;
`

export const DataFieldLabel = styled(InputLabel)`
  font-size: 0.8rem;
`
export const DataField = styled(DatePicker)`
  margin:0 4px;
`