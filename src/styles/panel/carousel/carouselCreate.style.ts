import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: block;
`

export const WrapperContent = styled.div`
  width: 60%;
  margin-right: auto;
  margin-left: auto;

  .filepond--panel-root {
    ${({ theme }) => css`
      background-color: ${theme.colors.contrast2};
    `}
  }

  .filepond--drop-label {
    ${({ theme }) => css`
      color: ${theme.colors.white};
    `}
  }

  .filepond--label-action {
    ${({ theme }) => css`
      color: ${theme.colors.white};
    `}
  }

  .filepond--drip-blob {
    ${({ theme }) => css`
      background-color: ${theme.colors.white3};
    `}
  }
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.white2};
  `}
`

export const WrapperButton = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.div`
  width: 15%;
`
