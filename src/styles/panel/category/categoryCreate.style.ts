import styled, { css } from 'styled-components'

export const WrapperButton = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: auto;
  margin-bottom: 10px;
`

export const Button = styled.div`
  width: 20%;
`

export const Wrapper = styled.div`
  width: 60%;
  margin-right: auto;
  margin-left: auto;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.white2};
  `}
`
