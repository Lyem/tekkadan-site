import * as S from './style'

export type IconProps = {
  color?: 'white2' | 'white' | 'primary' | 'primary2'
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
  size?: number
  center?: boolean
}

const Icon = ({
  color = 'white2',
  icon = 'icon-bell',
  size = 14,
  center = true
}: IconProps) => {
  return (
    <S.WrapperIcon center={center} color={color} size={size}>
      <span className={icon}></span>
    </S.WrapperIcon>
  )
}

export default Icon
