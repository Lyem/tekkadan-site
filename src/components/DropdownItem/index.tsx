import Link from 'next/link'
import * as S from './style'
import Icon from '../Icon'
import { MouseEventHandler } from 'react'

export type DropdownItemProps = {
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
  text: string
  log_out?: boolean
  href: string
  onClick?: MouseEventHandler | undefined
}

const DropdownItem = ({
  icon,
  text,
  log_out = false,
  href,
  onClick
}: DropdownItemProps) => {
  return (
    <S.WrapperUserSubMenuItem>
      <Link href={href}>
        <S.SubMenuLinks onClick={onClick} log_out={log_out}>
          <S.WrapperIcon>
            <Icon color="white" icon={icon} size={20} />
            <p>{text}</p>
          </S.WrapperIcon>
        </S.SubMenuLinks>
      </Link>
    </S.WrapperUserSubMenuItem>
  )
}

export default DropdownItem
