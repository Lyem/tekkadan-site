import { image } from '../../shared/api.routes'
import * as S from './style'

type CarouselProps = {
  background?: string
  title?: string
}

const Carousel = ({ background = '', title = '' }: CarouselProps) => {
  return (
    <S.Wrapper background={image + background}>
      <S.Title src={image + title} />
    </S.Wrapper>
  )
}

export default Carousel
