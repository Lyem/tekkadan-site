import * as S from './style'
import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = {
  children?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  size = 'medium',
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <S.Wrapper size={size} fullWidth={fullWidth} {...props}>
      {!!children && <span>{children}</span>}
    </S.Wrapper>
  )
}

export default Button
