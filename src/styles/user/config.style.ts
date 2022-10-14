import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  ${media.lessThan('medium')`
    width: 95%;
  `}
`

export const Title = styled.h1``

export const WrapperName = styled.div`
  display: flex;
  flex-direction: row;
`

export const tag = styled.p`
  font-size: 20px;
  margin-top: auto;
  margin-bottom: auto;
`

export const WrapperButton = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: auto;
`

export const Button = styled.div``
