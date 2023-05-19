import { Nullable, SaldoConta } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryPie } from "victory"
import * as Styled from './DistribuicaoSaldo.styles'
function DistribuicaoSaldo() {
  let movimentacoesService:Nullable<MovimentacoesService> = null
  const [saldos,setSaldos] = useState<SaldoConta[]>([])
  useEffect(()=>{
    movimentacoesService = new MovimentacoesService()
  },[])
  useEffect(()=>{
    console.log(saldos);
    
  },[saldos])
  
  useEffect(()=>{
    const loadMovimentacoes = async ()=>{
      if (!movimentacoesService) return
      try {
        const {data} = await movimentacoesService.getDistricuicaoSaldo()
        setSaldos(data)
      } catch (error) {
        console.log({error});
      }
    }
    loadMovimentacoes()
  },[movimentacoesService])

  return (
    <Styled.Container>
      <VictoryPie
      colorScale='qualitative'
      data={saldos.map(s => ({
        x:`${s.conta} - R$ ${s.saldo.toFixed(2)}`,
        y:s.saldo
      })).filter(g => g.y>0)}
    />
    </Styled.Container>
  )
}

export default DistribuicaoSaldo