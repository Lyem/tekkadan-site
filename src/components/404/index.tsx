import Rive from '@rive-app/react-canvas'
import * as S from './style'

const NotFound = () => {
  return (
    <S.Wrapper>
      <Rive style={{ height: '50rem', width: '50rem' }} src="/rive/404.riv" />
    </S.Wrapper>
  )
}

export default NotFound
