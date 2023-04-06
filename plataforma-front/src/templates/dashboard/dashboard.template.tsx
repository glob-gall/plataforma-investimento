import React from 'react'
import {DashboardTemplateProps} from "@/templates/dashboard/dashboard.types";
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import * as Styles from './dashboard.styles';

const DashboardTemplate: React.FC<DashboardTemplateProps> = () => {
    return (
        <div>
          <Styles.ActionsContainer>
            <Button variant="outlined">Outlined</Button>
            <Styles.Botao variant="contained">teste</Styles.Botao>
          </Styles.ActionsContainer>
        </div>
    )
}

export default DashboardTemplate