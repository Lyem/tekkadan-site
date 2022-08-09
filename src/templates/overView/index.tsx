import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import * as S from './style'

export type OverViewProps = {
  transparency?: boolean
  fixed?: boolean
  children: React.ReactNode
  background: string
}

const OverView = ({
  transparency = false,
  fixed = false,
  children,
  background
}: OverViewProps) => {
  return (
    <S.wrapper>
      <NavBar transparency={transparency} fixed={fixed} />
      <S.BackgroundImage background={background}></S.BackgroundImage>
      <S.ContentWrapper fixed={fixed}>{children}</S.ContentWrapper>
      <Footer></Footer>
    </S.wrapper>
  )
}

export default OverView
