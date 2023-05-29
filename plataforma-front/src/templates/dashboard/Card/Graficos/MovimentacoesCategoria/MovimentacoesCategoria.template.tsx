import { Nullable, SaldoCategoria } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryAxis, VictoryBar, VictoryChart } from "victory"
import * as Styled from './MovimentacoesCategoria.styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material"
import Empty from "@/components/organisms/Empty/empty.component"
import { Payments } from "@mui/icons-material"


function MovimentacoesCategoria() {
  let movimentacoesService:Nullable<MovimentacoesService> = null
  const [saldos,setSaldos] = useState<SaldoCategoria[]>([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    movimentacoesService = new MovimentacoesService()
  },[])
  
  useEffect(()=>{
    setLoading(true)
    const loadMovimentacoes = async ()=>{
      if (!movimentacoesService) return
      try {
        const {data} = await movimentacoesService.getMovimentacoesCategorias()
        const newSaldos = data.filter(s => s.saldo !== 0)

        setSaldos(newSaldos)
      } catch (error) {
        console.log({error});
      }
    }
    loadMovimentacoes()
    setLoading(false)
  },[movimentacoesService])

  if(loading) return (
    <Skeleton variant="circular" width={'90%'} height={'90%'} />
  )
  if(saldos.length===0) return (
    <Empty text="Você ainda não tem nenhum saldo!"/>
   )

  return (
    <Styled.Container>

        <VictoryChart 
          domainPadding={10}
          width={760}
        >
          <VictoryBar 
            name="Bar-1"
            style={{ data: { fill: "grey"} }}
            labels={({datum}) => `R$ ${Math.abs(datum.saldo).toFixed(2)}`}
            data={saldos}
            x="categoria"
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
                  primary={`${saldo.categoria} - R$ ${saldo.saldo.toFixed(2)}`}
                />
              </ListItem>
          </>
        ))}
        <Divider />
      </List>
    </Styled.Container>
  )
}

export default MovimentacoesCategoria