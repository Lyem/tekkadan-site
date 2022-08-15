import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type OpenProps = {
  open: boolean
}

type ImageProps = {
  open: boolean
  size: number
}

type ConfigProps = {
  open: boolean
  config: boolean
}

type Url = {
  url: string
}

export const WrapperRoot = styled.main`
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overflow: hidden;
`

export const Wrapper = styled.div`
  height: calc(100% - 62px);
  overflow: hidden;
`

export const infosTitle = styled.h2`
  padding-top: 50px;
  padding-left: 20px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const confTitle = styled.p`
  margin-bottom: 10px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const infos = styled.div`
  display: flex;
`

export const cover = styled.div<Url>`
  width: 100%;
  height: 175px;
  padding-top: 140px;
  padding-left: 20px;
  ${({ url }) => css`
    background-image: url(${url});
  `}
`

export const Reader = styled.div<OpenProps>`
  text-align: left;
  display: block;
  align-items: center;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  ${({ open }) => css`
    ${open ? `margin-right: 320px;` : `margin-right: 0px;`}
  `}
  transition: all 100ms 100ms linear;
`

export const WrapperMenuButtons = styled.div<OpenProps>`
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  z-index: 1;
  ${({ open }) => css`
    ${open ? `margin-right: 340px;` : `margin-right: 20px;`}
  `}
  transition: all 100ms 100ms linear;
  & > button {
    margin-bottom: 7px;
  }
`

export const SideMenu = styled.div<OpenProps>`
  height: calc(100% - 62px);
  width: 320px;
  right: 0;
  position: fixed;
  ${({ theme, open }) => css`
    background-color: ${theme.colors.contrast3};
    ${open ? `transform: translateX(0);` : `transform: translateX(100%);`}
    transform-origin: center right;
    transition: all 100ms 100ms linear;
  `}
`

export const Title = styled.p`
  line-height: 35px;
  font-size: 20px;
  font-weight: 700 !important;
  word-break: break-word;
  ${({ theme }) => css`
    color: ${theme.colors.white2};
  `}
`

export const Date = styled.p`
  flex-basis: 100px;
  flex-shrink: 0;
  align-self: flex-end;
  margin-bottom: 20px;
  text-align: right;
  ${({ theme }) => css`
    color: ${theme.colors.white3};
  `}
`

export const Division = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  font-family: Arial, Helvetica, sans-serif;
  ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
    margin-bottom: ${theme.spacings.xxlarge};
    color: ${theme.colors.white3};
    border-bottom: 1px solid ${theme.colors.contrast};
  `}
  ${media.lessThan('medium')`
    ${({ theme }) => css`
      margin-bottom: ${theme.spacings.xlarge};
      width: 100%;
    `}
  `}
`

export const Image = styled.div<ImageProps>`
  display: block;
  font-size: 0;
  margin-left: auto;
  margin-right: auto;
  transition: width 0.2s;
  ${({ size }) => css`
    width: ${size}vw;
  `}
  ${media.lessThan('medium')`
    width: 100vw;
  `}
`

export const Config = styled.li<ConfigProps>`
  list-style: none;
  margin-top: 10px;
  position: fixed;
  right: 0;
  width: 400px;
  padding: 25px;
  transform-origin: top center;
  transition: all 100ms 100ms linear;
  ${({ theme, open, config }) => css`
    background-color: ${theme.colors.contrast2};
    border-radius: ${theme.border.radius};
    ${open ? `margin-right: 340px;` : `margin-right: 20px;`}
    ${config ? `transform: rotateX(0);` : `transform: rotateX(-90deg);`}
  `}
`

export const WrapperCaps = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 200px;
  height: 53vh;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
  `}
`

export const Cap = styled.p`
  cursor: pointer;
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  ${({ theme }) => css`
    color: ${theme.colors.white2};
    background-color: ${theme.colors.contrast};
    border-radius: ${theme.border.radius};
  `}
`
