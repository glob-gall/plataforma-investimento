import { DateField, DateFieldProps } from '@mui/x-date-pickers'
import styled from 'styled-components'

export const DateInput = styled(DateField)<
  DateFieldProps<any> & { error: boolean }
>``
