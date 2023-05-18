import React from 'react'
import { DashboardTemplateProps } from '@/templates/dashboard/dashboard.types'
import Box from '@mui/material/Box'

import { Container } from '@mui/material'
import CardMovimentacoes from './Card/Movimentacoes'
import GraficosCard from './Card/Graficos'

import * as Styles from './dashboard.styles'

const DashboardTemplate: React.FC<DashboardTemplateProps> = () => {
  return (
    <Container>
      <Styles.Card variant="outlined" style={{ marginRight: 50 }}>
        <Box component="main" sx={{ p: 3 }}>
          <CardMovimentacoes />
        </Box>
      </Styles.Card>
      <Styles.Card variant="outlined" >
          <GraficosCard />
      </Styles.Card>

    </Container>
  )
}

export default DashboardTemplate
