import { Typography } from "@mui/material";
import { Resumo } from "../../investimentos.types";
import { toBRL } from "@/utils/currency/currency.util";
import * as Styles from './styles'
export interface ResumoProps {
  resumo:Resumo
}
function ResumoInvestimentos(props:ResumoProps){
  const {
    resumo:{carteira,retorno_total}
  } = props
  return(
    <Styles.ResumoContainer>
      <Styles.Values>
        saldo: <Typography
          variant="h6">{toBRL(carteira)}</Typography>
      </Styles.Values>
      <Styles.Values>
        retorno: <Typography
          variant="h6"
          style={{ fontWeight: 'bold', color:retorno_total>0?'#03AF0C': '#E40050' }}
          >{toBRL(retorno_total)}</Typography>
      </Styles.Values>
    </Styles.ResumoContainer>
  )
}

export default ResumoInvestimentos 