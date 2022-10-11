import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  text-align: center;
`

export const Image = styled.div`
  display: flex;

  ${({ theme }) => css`
    margin-right: ${theme.spacings.small};
    border-radius: ${theme.border.radius};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white2};
    font-size: ${theme.font.sizes.xlarge};
  `}
`

export const UploadWrapper = styled.div`
  width: 30%;
  display: 'block';
  margin-left: auto;
  margin-right: auto;
`

export const Manga = styled.div`
  display: inline-flex;
  ${({ theme }) => css`
    background-color: ${theme.colors.contrast2};
    padding: ${theme.spacings.xsmall};
  `}
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  height: 200px;
  margin-top: 10px;
  text-align: left;
`

export const Cap = styled.div`
  width: 230px;
`

export const Infos = styled.div`
  display: grid;
  width: 60%;
  grid: 100% / 240px 1fr;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
`

export const WrapperButton = styled.div`
  top: 69px;
  position: fixed;
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-right: auto;
`

export const WrapperButton2 = styled.div`
  top: 115px;
  position: fixed;
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
  margin-top: 10px;

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
