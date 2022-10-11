import * as S from './style'

type CarouselProps = {
  background?: string
  title?: string
}

const Carousel = ({ background = '', title = '' }: CarouselProps) => {
  return (
    <S.Wrapper background={background}>
      <S.Title src={title} />
    </S.Wrapper>
  )
}

export default Carousel
