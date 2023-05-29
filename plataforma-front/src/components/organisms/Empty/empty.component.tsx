import * as Styled from './empty.styles'
import { EmptyProps } from './empty.types'

function Empty(props:EmptyProps){
  const {
    text = "Nada para ver aqui!"
  } = props
  return (
    <Styled.EmptyWrapper>
    <Styled.EmptyText>
      {text}
    </Styled.EmptyText>
  </Styled.EmptyWrapper>
  )
}

export default Empty