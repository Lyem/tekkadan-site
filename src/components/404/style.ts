import styled, { css } from 'styled-components'

export const Text = styled.h1`
  text-align: center;
  margin-top: 20vh;
  margin-bottom: 25vh;
  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
  font-size: 20rem;
`
