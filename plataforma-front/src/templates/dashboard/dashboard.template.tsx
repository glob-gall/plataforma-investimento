import React from 'react'
import { DashboardTemplateProps } from '@/templates/dashboard/dashboard.types'
import Box from '@mui/material/Box'

import { Card, Container } from '@mui/material'
import CardMovimentacoes from './Card/Movimentacoes'
import { useAuth } from '@/hooks/auth/use-auth.hook'

const DashboardTemplate: React.FC<DashboardTemplateProps> = () => {
  return (
    <Container>
      <Card variant="outlined" style={{ marginRight: 50 }}>
        <Box component="main" sx={{ p: 3 }}>
          <CardMovimentacoes />
        </Box>
      </Card>
    </Container>
  )
}

export default DashboardTemplate
