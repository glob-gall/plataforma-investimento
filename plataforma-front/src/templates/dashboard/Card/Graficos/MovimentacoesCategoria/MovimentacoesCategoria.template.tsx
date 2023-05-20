import { Nullable, SaldoCategoria } from "@/services/movimentacoes/movimentacoes.interface"
import { MovimentacoesService } from "@/services/movimentacoes/movimentacoes.service"
import { useEffect, useState } from "react"
import { VictoryAxis, VictoryBar, VictoryChart } from "victory"
import * as Styled from './MovimentacoesCategoria.styles'
import { Skeleton } from "@mui/material"


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
  return (
    <Styled.Container>

        <VictoryChart domainPadding={10}>
          <VictoryBar name="Bar-1"
            style={{ data: { fill: "grey"} }}
            labels={({datum}) => `R$ ${Math.abs(datum.saldo).toFixed(2)}`}
            data={saldos}
            x="categoria"
            y="saldo"
          />
          <VictoryAxis crossAxis={false}/>
        </VictoryChart>

    </Styled.Container>
  )
}

export default MovimentacoesCategoria