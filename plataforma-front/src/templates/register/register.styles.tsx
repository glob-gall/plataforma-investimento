import { styled } from '@mui/material/styles';
import {Grid} from "@mui/material";
import {GridProps} from "@mui/system";

export const PageContainer = styled('main')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

export const VideoContainer = styled(Grid)<GridProps & { component:string, autoPlay: boolean, muted: boolean, loop: boolean }>`
    @media (max-width: 900px) {
        display: none;
    }
`