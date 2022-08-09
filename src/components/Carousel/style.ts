import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
    background-color: ${theme.colors.contrast2};
  `}
  height: 60vh;
  //max-width: 1209px;
  margin-right: auto;
  margin-left: auto;
`
