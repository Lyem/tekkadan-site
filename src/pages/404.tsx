import NotFound from '../components/404'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import * as S from '../styles/404.style'

export default function Custom404() {
  return (
    <S.Wrapper>
      <NavBar />
      <NotFound />
      <Footer />
    </S.Wrapper>
  )
}
