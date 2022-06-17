import styled, { css } from 'styled-components'

import * as TextFieldStyles from '../components/TextField/style'
import * as ButtonStyles from '../components/Button/style'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    ${TextFieldStyles.Wrapper} {
      margin-top: ${theme.spacings.xxsmall};
      margin-bottom: ${theme.spacings.xxsmall};
    }

    ${ButtonStyles.Wrapper} {
      margin-top: ${theme.spacings.small};
      margin-bottom: ${theme.spacings.xsmall};
    }
  `}
`

export const FormLink = styled.div`
  ${({ theme }) => css`
    display: block;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.white};
    text-align: center;
    & > a {
      text-decoration: none;
      color: ${theme.colors.secondary};
      border-bottom: 0.1rem solid ${theme.colors.secondary};
    }
  `}
`
