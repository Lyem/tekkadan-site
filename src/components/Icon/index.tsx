import * as S from './style'
import { HTMLAttributes } from 'react'

export type IconProps = {
  color?: 'white2' | 'white' | 'primary' | 'primary2' | 'yellow'
  icon?:
    | 'icon-bell'
    | 'icon-lock'
    | 'icon-save'
    | 'icon-setting'
    | 'icon-magnifier'
    | 'icon-login'
    | 'icon-logout'
    | 'icon-message'
    | 'icon-account'
    | 'icon-bars'
    | 'icon-star'
    | 'icon-discord'
    | 'icon-twitter'
    | 'icon-forward'
    | 'icon-back-arrow'
    | 'icon-love'
    | 'icon-chat'
  size?: number
  center?: boolean
} & HTMLAttributes<HTMLSpanElement>

const Icon = ({
  color = 'white2',
  icon = 'icon-bell',
  size = 14,
  center = true,
  ...props
}: IconProps) => {
  return (
    <S.WrapperIcon center={center} color={color} size={size}>
      <span className={icon} {...props}></span>
    </S.WrapperIcon>
  )
}

export default Icon
