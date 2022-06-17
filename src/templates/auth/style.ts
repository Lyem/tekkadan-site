import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import * as LogoStyles from '../../components/Logo/style'
import * as TitleTag from '../../components/TitleTag/style'

export const Wrapper = styled.main`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

export const BannerBlock = styled.div`
  ${({ theme }) => css`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100vh;
    background-image: url(/auth.jpg);
    background-size: cover;
    background-position: center center;
    -webkit-filter: blur(0.6rem);
    -moz-filter: blur(0.6rem);
    -o-filter: blur(0.6rem);
    -ms-filter: blur(0.6rem);
    filter: blur(0.6rem);
    z-index: 1;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${theme.colors.black};
      opacity: 0.7;
    }
  `}
`

export const ContentWrapper = styled.div`
  width: 30rem;
  position: relative;
  z-index: 2;
  ${media.greaterThan('medium')`
    width: 30rem;
  `}
  ${({ theme }) => css`
    ${LogoStyles.Wrapper} {
      margin: 0 auto ${theme.spacings.large};
    }

    ${TitleTag.Tag} {
      margin-bottom: ${theme.spacings.medium};
    }
  `}
`
