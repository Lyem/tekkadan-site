import { ButtonHTMLAttributes } from 'react'
import * as S from './style'

export type IconButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <S.Button {...props}>{children}</S.Button>
}

export default IconButton
