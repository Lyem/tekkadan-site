import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  margin-top: 30px;
  ${({ theme }) => css`
    padding-left: ${theme.spacings.xxxlarge};
    padding-right: ${theme.spacings.xxxlarge};
    .swiper-pagination-bullet-active {
      background-color: ${theme.colors.white2};
    }
  `}
  ${media.lessThan('medium')`
    ${({ theme }) => css`
      padding-left: ${theme.spacings.small};
      padding-right: ${theme.spacings.small};
    `}
  `}
`

export const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 1.5rem;
  ${media.lessThan('large')`
    grid-template-columns: repeat(2, minmax(0, 1fr));
    #item3 {
      display: none;
    }
    ${media.lessThan('medium')`
      grid-template-columns: repeat(1, minmax(0, 1fr));
      #item2 {
        display: none;
      }
    `}
  `}
`

export const Lasts = styled.div`
  display: grid;
  ${({ theme }) => css`
    min-height: 100px;
    padding: 2rem;
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.contrast};
  `}
  gap: 1rem;
  align-content: start;
`

export const WrapperLast = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 80px;
  flex-direction: row;
  p {
    margin: 0;
  }
`

export const WrapperLastContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
`

export const LastMangaImage = styled.img`
  cursor: pointer;
  height: 80px;
  min-width: 56px;
  max-width: 56px;
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
  `}
`

export const LastTitle = styled.p`
  cursor: pointer;
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
  `}
`

export const LastCap = styled.p`
  cursor: pointer;
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.normal};
  `}
`

export const LastTime = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.light};
  `}
`

export const WrapperFooter = styled.div`
  position: relative;
  right: 0;
  left: 0;
  bottom: 0;
`
