import { SaldoTempo, SaldoTempoType } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { VictoryAxis, VictoryBar, VictoryChart } from "victory"
import * as Styled from './GastoTempo.styles'
import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, MenuItem, Skeleton, TextField } from "@mui/material"
import Empty from "@/components/organisms/Empty/empty.component"
import { Payments } from "@mui/icons-material"


function MovimentacoesTempo() {
  const movimentacoesService = useMemo(()=>new MovimentacoesService(),[])
  const [saldos,setSaldos] = useState<SaldoTempo[]>([])
  const [loading,setLoading] = useState(true)
  const [tipo, setTipo] = useState<SaldoTempoType>(SaldoTempoType.month);

  const loadMovimentacoes = useCallback(async ()=>{
    try {
      const {data} = await movimentacoesService.getMovimentacoesTempo(tipo)
      setSaldos(data.values)
    } catch (error) {
      console.log({error});
    }
  },[movimentacoesService,tipo])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value as unknown as SaldoTempoType);
  };
  
  useEffect(()=>{
    setLoading(true)
    loadMovimentacoes()
    setLoading(false)
  },[loadMovimentacoes])

  if(loading) return (
    <Skeleton variant="circular" width={'90%'} height={'90%'} />
  )
  if(saldos.length===0) return (
    <Empty text="Você ainda não tem nenhum saldo!"/>
   )

  return (
    <Styled.Container>
      <Box>
        <TextField
          select
          id="demo-simple-select"
          value={`${tipo}`}
          label="Selecione"
          onChange={handleChange}
          defaultValue={SaldoTempoType.day}
        >
          <MenuItem value={SaldoTempoType.year}>Ano</MenuItem>
          <MenuItem value={SaldoTempoType.month}>Mês</MenuItem>
          <MenuItem value={SaldoTempoType.day}>Dia</MenuItem>
        </TextField>
      </Box>
        <VictoryChart 
          domainPadding={10}
          width={760}
        >
          <VictoryBar 
            name="Bar-1"
            style={{ data: { fill: "grey"} }}
            labels={({datum}) => `R$ ${Math.abs(datum.saldo).toFixed(2)}`}
            data={saldos}
            x="key"
            y="saldo"
          />
          <VictoryAxis crossAxis={false}/>
        </VictoryChart>

        <List dense={false}>
        {saldos.map(saldo => (
          <>
            <Divider />
              <ListItem>
                <ListItemIcon>
                  <Payments />
                </ListItemIcon>
                <ListItemText
                  primary={`${saldo.key} - R$ ${saldo.saldo.toFixed(2)}`}
                />
              </ListItem>
          </>
        ))}
        <Divider />
      </List>
    </Styled.Container>
  )
}

export default MovimentacoesTempo