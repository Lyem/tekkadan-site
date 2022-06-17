import Head from 'next/head'
import Logo from '../Logo'
import * as S from './style'

const Loading = () => {
  return (
    <S.Wraper>
      <Head>
        <title>Tekkadan</title>
      </Head>
      <Logo size="large" animate={true} />
    </S.Wraper>
  )
}

export default Loading
