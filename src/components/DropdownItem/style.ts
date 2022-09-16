import styled, { css } from 'styled-components'
import * as IconStyle from '../Icon/style'

export type DropdownItemProps = {
  log_out?: boolean
}

export const SubMenuLinks = styled.a<DropdownItemProps>`
  ${({ theme }) => css`
    display: block;
    padding: 0 ${theme.spacings.xsmall} ${theme.spacings.xxsmall}
      ${theme.spacings.xsmall};
    color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
  `}
  &:hover {
    cursor: pointer;
    text-decoration: none;
    ${({ theme, log_out }) => css`
      background-color: ${theme.colors.contrast3};
      ${log_out
        ? `color: ${theme.colors.primary};`
        : `color: ${theme.colors.white2};`};
    `}
    ${IconStyle.WrapperIcon} > span {
      ${({ theme, log_out }) => css`
        ${log_out
          ? `color: ${theme.colors.primary};`
          : `color: ${theme.colors.white2};`};
      `}
    }
  }
  &:active {
    text-decoration: none;
    ${({ theme, log_out }) => css`
      ${log_out
        ? `color: ${theme.colors.primary2};`
        : `color: ${theme.colors.white3};`};
    `}
    ${IconStyle.WrapperIcon} > span {
      ${({ theme, log_out }) => css`
        ${log_out
          ? `color: ${theme.colors.primary2};`
          : `color: ${theme.colors.white3};`};
      `}
    }
  }
`

export const WrapperIcon = styled.div`
  display: flex;
  align-items: center;
  & > p {
    margin-left: 0.8rem;
    margin-top: auto;
    margin-bottom: auto;
  }
`

export const WrapperUserSubMenuItem = styled.li`
  text-align: left;
  white-space: nowrap;
`
