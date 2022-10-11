import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  text-align: center;
`

export const WrapperContent = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
`

export const Title = styled.h1`
  text-align: left;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const WrapperButton = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-right: auto;
`

export const Button = styled.div`
  width: 10%;
`

export const Files = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;

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
