import { DateField, DateFieldProps } from '@mui/x-date-pickers'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const DateInput = styled(DateField)<
  DateFieldProps<any> & { error: boolean }
>``
