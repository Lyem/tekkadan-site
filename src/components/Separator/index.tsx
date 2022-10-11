import { RightOutlined } from '@ant-design/icons'
import * as S from './style'

type SeparatorProps = {
  title: string
}

function Separator({ title }: SeparatorProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.Icon>
        <RightOutlined />
      </S.Icon>
    </S.Wrapper>
  )
}

export default Separator
