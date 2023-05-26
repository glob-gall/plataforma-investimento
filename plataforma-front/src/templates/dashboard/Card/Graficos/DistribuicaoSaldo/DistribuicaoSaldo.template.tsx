import { Nullable, SaldoConta } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryPie } from "victory"
import * as Styled from './DistribuicaoSaldo.styles'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material"
import Empty from "@/components/organisms/Empty/empty.component"
import { Payments } from "@mui/icons-material"

function DistribuicaoSaldo() {
  let movimentacoesService:Nullable<MovimentacoesService> = null
  const [saldos,setSaldos] = useState<SaldoConta[]>([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    movimentacoesService = new MovimentacoesService()
  },[])
  
  useEffect(()=>{
    setLoading(true)
    const loadMovimentacoes = async ()=>{
      if (!movimentacoesService) return
      try {
        const {data} = await movimentacoesService.getDistricuicaoSaldo()
        const newSaldos = data.map(({conta,saldo}) => ({
          saldo,
          conta: `${conta} - R$ ${saldo.toFixed(2)}`
        })).filter(s => s.saldo > 0)

        setSaldos(newSaldos)
      } catch (error) {
        console.log({error});
      }
    }
    loadMovimentacoes()
    setLoading(false)
  },[movimentacoesService])

  if(loading) return (
    <Skeleton variant="circular" width={500} height={500} />
  )
  if(saldos.length===0) return (
   <Empty text="Você ainda não tem nenhum saldo!"/>
  )
  
  return (
    <Styled.Container>
      <VictoryPie
        width={760}
        colorScale='qualitative'
        data={saldos}
        x="conta"
        y="saldo"
      />
      
      <List dense={false}>
        {saldos.map(saldo => (
          <>
            <Divider />
              <ListItem>
                <ListItemIcon>
                  <Payments />
                </ListItemIcon>
                <ListItemText
                  primary={`${saldo.conta}`}
                />
              </ListItem>
          </>
        ))}
        <Divider />
      </List>
    </Styled.Container>
  )
}

export default DistribuicaoSaldo