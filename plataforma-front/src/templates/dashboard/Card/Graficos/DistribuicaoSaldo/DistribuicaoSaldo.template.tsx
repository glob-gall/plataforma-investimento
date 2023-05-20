import { Nullable } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryPie } from "victory"
import * as Styled from './DistribuicaoSaldo.styles'
import { Skeleton } from "@mui/material"


interface graphData {
  x:string,
  y:number
}
function DistribuicaoSaldo() {
  let movimentacoesService:Nullable<MovimentacoesService> = null
  const [saldos,setSaldos] = useState<graphData[]>([])
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
        const newSaldos = data.map(s => ({
          x:`${s.conta} - R$ ${s.saldo.toFixed(2)}`,
          y:s.saldo
        })).filter(g => g.y>0)

        setSaldos(newSaldos)
      } catch (error) {
        console.log({error});
      }
    }
    loadMovimentacoes()
    setLoading(false)
  },[movimentacoesService])

  if(loading) return (
    <Skeleton variant="circular" width={600} height={600} />
  )
  return (
    <Styled.Container>
      <VictoryPie
      colorScale='qualitative'
      data={saldos}
    />
    </Styled.Container>
  )
}

export default DistribuicaoSaldo