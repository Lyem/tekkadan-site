import Logo from '../Logo'
import * as S from './style'

const PanelLoading = () => {
  return (
    <S.Wrapper>
      <S.Loading>
        <Logo size="normal" animate={true} animateType="infinit" />
        <S.Title>Carregando...</S.Title>
      </S.Loading>
    </S.Wrapper>
  )
}

export default PanelLoading
