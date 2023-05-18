import styled from 'styled-components';
import { TextField,Typography,Container as MaterialContainer } from '@mui/material'

export const Container = styled(MaterialContainer)`
    margin-bottom:64px;
`;
export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding:18px 36px;
    margin-top:10px;
`;
export const Username = styled(Typography)`
    font-weight: bold;
    margin-top:24px;
`;

export const Input = styled(TextField)`
    
`
export const ProfileForm = styled.form`
    max-width: 360px;
`
export const ButtonContainer = styled.div`
    margin-top:16px;
    display: flex;
    flex-direction:column;
    margin-left: auto;
`

export const UserCreatedDate = styled(Typography)`
    text-align: right;
    font-size: 14px;
    margin-top:8px;
`