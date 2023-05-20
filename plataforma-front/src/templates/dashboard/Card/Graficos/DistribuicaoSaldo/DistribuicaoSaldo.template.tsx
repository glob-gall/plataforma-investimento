import { Nullable, SaldoConta } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryPie } from "victory"
import * as Styled from './DistribuicaoSaldo.styles'
import { Skeleton } from "@mui/material"

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
          conta: `${conta} - R$ ${saldo}`
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
    <Skeleton variant="circular" width={600} height={600} />
  )
  return (
    <Styled.Container>
      <VictoryPie
        colorScale='qualitative'
        data={saldos}
        x="conta"
        y="saldo"
      />
    </Styled.Container>
  )
}

export default DistribuicaoSaldo