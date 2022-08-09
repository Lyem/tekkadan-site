import styled, { css } from 'styled-components'
import * as StarStyle from '../components/Icon/style'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  color: white;
  ${({ theme }) => css`
    padding-left: ${theme.spacings.xxxlarge};
    padding-right: ${theme.spacings.xxxlarge};
  `}
  ${media.lessThan('medium')`
    ${({ theme }) => css`
      padding-left: ${theme.spacings.small};
      padding-right: ${theme.spacings.small};
    `}
  `}
`

export const Cover = styled.div`
  position: absolute;
  display: flex;
  height: 360px;
  width: 250px;
  margin-top: -7vh;
  ${media.lessThan('medium')`
    display: block;
    height: 240px;
    width: 160px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  `}
`

export const Title = styled.h1`
  margin-left: calc(250px + 65px);
  margin-bottom: 27px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.lessThan('medium')`
    margin-left: 0px;
    margin-top: 170px;
    font-size: 25px;
  `}
`

export const synopsis = styled.p`
  margin-left: calc(250px + 65px);
  height: 220px;
  line-height: 120%;
  overflow: hidden;
  ${media.lessThan('medium')`
    margin-left: 0px;
    height: auto;
    max-height: 220px;
    line-height: 120%;
  `}
`

export const points = styled.p`
  margin-left: 5px;
  margin-top: 14px;
  ${media.lessThan('medium')`
    margin-top: calc(170px + 7px);
  `}
`

export const WrapperTitle = styled.div`
  display: flex;
  ${StarStyle.WrapperIcon} {
    margin-left: 10px;
    margin-top: 12px;
  }
`

export const WrapperSide = styled.div`
  display: grid;
  grid: 100% / 250px 1fr;
  margin-top: 50px;
  ${media.lessThan('medium')`
    display: block;
    margin-top: 20px;
  `}
`

export const WrapperInfos = styled.div`
  width: 250px;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

export const WrapperCaps = styled.div`
  margin-left: 65px;
  min-height: 50vh;
  ${media.lessThan('medium')`
    margin-left: 0px;
    ${({ theme }) => css`
      padding-top: ${theme.spacings.small};
    `}
  `}
`

export const Caps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast};
    padding-top: ${theme.spacings.xxxsmall};
    padding-bottom: ${theme.spacings.xxxsmall};
    padding-left: ${theme.spacings.xsmall};
    padding-right: ${theme.spacings.xsmall};
    border-radius: ${theme.border.radius};
    margin-bottom: ${theme.spacings.xxsmall};
  `};
`

export const WrapperVar = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => css`
    margin-bottom: ${theme.spacings.xxxsmall};
  `}
`

export const Var = styled.p``
