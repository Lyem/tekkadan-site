import Link from 'next/link'
import Icon from '../Icon'
import * as S from './style'

const Footer = () => {
  return (
    <S.Wrapper>
      <S.Wave></S.Wave>
      <S.Wave2></S.Wave2>
      <S.Wave3></S.Wave3>
      <S.SocialWrapper>
        <S.Social>
          <a target="_blank" href="/discord">
            <Icon icon="icon-discord" size={35} />
          </a>
        </S.Social>
        <S.Social>
          <a
            target="_blank"
            href="https://twitter.com/TekkadanScan?t=zZhfHRdDUfmMFHXlwPg8uw&s=09"
            rel="noreferrer"
          >
            <Icon icon="icon-twitter" size={35} />
          </a>
        </S.Social>
      </S.SocialWrapper>
      <S.MenuWrapper>
        <S.Menu>
          <Link href="/">
            <p>Inicio</p>
          </Link>
        </S.Menu>
        <S.Menu>
          <Link href="/">
            <p>Obras</p>
          </Link>
        </S.Menu>
        <S.Menu>
          <Link href="/">
            <p>Social</p>
          </Link>
        </S.Menu>
        <S.Menu>
          <Link href="/">
            <p>Staff</p>
          </Link>
        </S.Menu>
        <S.Menu>
          <Link href="/">
            <p>DMCA</p>
          </Link>
        </S.Menu>
      </S.MenuWrapper>
      <p>2022 Tekkadan | All rights reserved</p>
    </S.Wrapper>
  )
}

export default Footer
