import { styled } from '@mui/material/styles';
import {Grid} from "@mui/material";

export const PageContainer = styled('main')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
`;

export const VideoContainer = styled(Grid)`
    @media (max-width: 900px) {
        display: none;
    }
`