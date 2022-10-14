import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import styled from 'styled-components'

type ErrorProps = {
  statusCode: number
}

function Error({ statusCode }: ErrorProps) {
  return (
    <>
      <NavBar />
      <Wrapper>
        <p>{statusCode}</p>
        <p>Algo deu muito errado, tente re carregar a pagina</p>
        <Img src="/tsuki-error.gif" />
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60vh;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
`
const Img = styled.img`
  height: 40vh;
`

const FooterWrapper = styled.div`
  position: relative;
  right: 0;
  left: 0;
  bottom: 0;
`

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
