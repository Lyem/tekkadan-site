import Link from 'next/link'
import Logo from '../Logo'
import TextField from '../TextField'
import * as S from './style'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as r from '../../utils/api.routes'
import Icon from '../Icon'
import DropdownItem from '../DropdownItem'
import axios from 'axios'
import Router from 'next/router'

export type NavBarProps = {
  logged?: boolean
}

const NavBar = () => {
  const [values, setValues] = useState({
    user: { owner: false, profile_photo: '', token: '' },
    logged: false
  })

  const handleClick = async () => {
    try {
      const response = await axios.delete(r.default.routes.logOut, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + values.user.token
        }
      })
      console.log(response.data)
      //localStorage.removeItem('user')
      setValues({
        user: {
          owner: false,
          profile_photo: '',
          token: ''
        },
        logged: false
      })
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.Wrapper>
      <S.WrapperLinks>
        <Link href="/">
          <a>
            <Logo size="xsmall" />
          </a>
        </Link>
        <Link href="/">
          <S.Links>Inicio</S.Links>
        </Link>
        <Link href="/">
          <S.Links>Obras</S.Links>
        </Link>
        <Link href="/">
          <S.Links>Social</S.Links>
        </Link>
        {values.logged && values.user.owner && (
          <Link href="/panel">
            <S.Links>Painel</S.Links>
          </Link>
        )}
      </S.WrapperLinks>
      <S.WrapperUser>
        <S.WrapperUserItem>
          <TextField
            placeholder="Pesquise no site"
            backgroundColor="black"
            iconPosition="right"
            fontSize="xxsmall"
            icon={<Icon icon="icon-magnifier" />}
          />
        </S.WrapperUserItem>
        <S.WrapperUserItem>
          <S.Notify>
            <Icon size={25} />
          </S.Notify>
        </S.WrapperUserItem>
        <S.WrapperUserItem>
          <S.User logged={values.logged}>
            {values.logged ? (
              <>
                <img src={r.default.routes.image + values.user.profile_photo} />
                <S.WrapperUserSubMenu>
                  <DropdownItem href="/" icon="icon-account" text="Perfil" />
                  <DropdownItem
                    href="/"
                    icon="icon-setting"
                    text="Configurações"
                  />
                  <DropdownItem
                    onClick={handleClick}
                    href="/"
                    log_out={true}
                    icon="icon-logout"
                    text="Sair"
                  />
                </S.WrapperUserSubMenu>
              </>
            ) : (
              <>
                <Icon color="white" icon="icon-account" size={25} />
                <S.WrapperUserSubMenu>
                  <DropdownItem
                    href="/sing-in"
                    icon="icon-login"
                    text="Login"
                  />
                  <DropdownItem
                    href="/sing-up"
                    icon="icon-account"
                    text="Criar conta"
                  />
                </S.WrapperUserSubMenu>
              </>
            )}
          </S.User>
        </S.WrapperUserItem>
      </S.WrapperUser>
    </S.Wrapper>
  )
}

export default NavBar
