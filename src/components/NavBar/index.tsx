import Link from 'next/link'
import Logo from '../Logo'
import TextField from '../TextField'
import * as S from './style'
import { useState, useEffect } from 'react'
import * as r from '../../utils/api.routes'
import Icon from '../Icon'
import DropdownItem from '../DropdownItem'
import axios from 'axios'
import Router from 'next/router'

export type NavBarProps = {
  logged?: boolean
  transparency?: boolean
  fixed?: boolean
}

const NavBar = ({ transparency = false, fixed = false }: NavBarProps) => {
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

  useEffect(() => {
    if (transparency) {
      const header = document.querySelector('header > div')!
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 2) {
          header.classList.remove('noScroll')
          header.classList.add('scrolled')
        } else if (window.scrollY < 2) {
          header.classList.remove('scrolled')
          header.classList.add('noScroll')
        }
      })
    }
  })

  return (
    <S.WrapperClass transparency={transparency}>
      <S.Wrapper className="noScroll" fixed={fixed}>
        <S.WrapperLinks>
          <S.HamburgerMenu>
            <Icon color="white" icon="icon-bars" size={25} />
            <S.WrapperLinksMobile>
              <S.LinksMobile2>
                <Link href="/">
                  <S.LinksMobile>Inicio</S.LinksMobile>
                </Link>
                <Link href="/">
                  <S.LinksMobile>Obras</S.LinksMobile>
                </Link>
                <Link href="/">
                  <S.LinksMobile>Social</S.LinksMobile>
                </Link>
                {values.logged && values.user.owner && (
                  <Link href="/panel">
                    <S.Links>Painel</S.Links>
                  </Link>
                )}
              </S.LinksMobile2>
            </S.WrapperLinksMobile>
          </S.HamburgerMenu>
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
            <S.SearchButton>
              <Icon color="white" icon="icon-magnifier" size={23} />
              <S.WrapperSearch>
                <S.WrapperSearchNav>
                  <TextField
                    placeholder="Pesquise no site"
                    backgroundColor="black"
                    iconPosition="right"
                    fontSize="xxsmall"
                    icon={<Icon icon="icon-magnifier" />}
                  />
                </S.WrapperSearchNav>
              </S.WrapperSearch>
            </S.SearchButton>
            <S.SearchTextFild>
              <TextField
                placeholder="Pesquise no site"
                backgroundColor="black"
                iconPosition="right"
                fontSize="xxsmall"
                icon={<Icon icon="icon-magnifier" />}
              />
            </S.SearchTextFild>
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
                  <img
                    src={r.default.routes.image + values.user.profile_photo}
                  />
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
    </S.WrapperClass>
  )
}

export default NavBar
