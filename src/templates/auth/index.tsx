import React, { useEffect } from 'react'
import Router from 'next/router'
import Logo from '../../components/Logo'
import TitleTag from '../../components/TitleTag'
import * as S from './style'

type AuthProps = {
  children: React.ReactNode
  title: string
}

const Auth = ({ children, title }: AuthProps) => {
  return (
    <S.Wrapper>
      <S.BannerBlock />
      <S.ContentWrapper>
        <Logo />
        <TitleTag title={title} />
        {children}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}

export default Auth
