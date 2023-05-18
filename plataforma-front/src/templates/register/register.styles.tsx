import { styled } from '@mui/material/styles';
import {Grid} from "@mui/material";
import {GridProps} from "@mui/system";
import { DateField } from '@mui/x-date-pickers/DateField';
import {DateFieldProps} from "@mui/x-date-pickers";

export const VideoContainer = styled(Grid)<GridProps & { component:string, autoPlay: boolean, muted: boolean, loop: boolean }>`
    @media (max-width: 900px) {
        display: none;
    }
`

export const DateInput = styled(DateField)<DateFieldProps<any> & { error: boolean }>``