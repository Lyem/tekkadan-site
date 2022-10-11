/* eslint-disable @typescript-eslint/ban-ts-comment */
import Link from 'next/link'
import Logo from '../Logo'
import TextField from '../TextField'
import * as S from './style'
import React, { useState, useEffect } from 'react'
import Icon from '../Icon'
import DropdownItem from '../DropdownItem'
import Router from 'next/router'
import debounce from '../../shared/debounce'
import { SearchService } from '../../Services/SearchService'
import { Search } from '../../Interfaces/SearchInterface'
import MangaList from '../MangaList'
import UserList from '../UserList'
import { Empty, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../store/userSlices'

export type NavBarProps = {
  transparency?: boolean
  fixed?: boolean
  className?: string
}

const NavBar = ({
  transparency = false,
  fixed = false,
  className = ''
}: NavBarProps) => {
  const searchService = new SearchService()

  const user = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const [searchResult, setsearchResult] = useState({
    mangas: [],
    users: []
  } as Search)

  const handleClick = async () => {
    try {
      dispatch(logout())
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (transparency && fixed) {
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
    <S.WrapperClass className={className} transparency={transparency}>
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
                {user.logged && user.data.owner && (
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
          {user.logged && user.data.owner && (
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
                id="search"
                placeholder="Pesquise no site"
                onInputChange={(v) =>
                  debounce(async () => {
                    if (v != '') {
                      setLoading(true)
                      const search = await searchService.MangaAndUserSearch(v)
                      setsearchResult(search.data)
                      setLoading(false)
                    } else {
                      setsearchResult({
                        mangas: [],
                        users: []
                      })
                    }
                  })
                }
                onInputFocus={() => {
                  const result = document.getElementById(
                    'result'
                  ) as HTMLDivElement
                  result.style.opacity = '1'
                  result.style.transform = 'rotateX(0deg)'
                  //@ts-ignore
                  result.style.transition_timing_function = 'ease-out'
                }}
                onInputBlur={() => {
                  // @ts-ignore
                  document.onclick = (
                    e: React.MouseEventHandler<HTMLElement>
                  ) => {
                    try {
                      //@ts-ignore
                      const id = e.target.id
                      const result =
                        //@ts-ignore
                        e.target.attributes.class.nodeValue.includes('result')
                      if (id !== 'result' && id !== 'search' && !result) {
                        const result = document.getElementById(
                          'result'
                        ) as HTMLDivElement
                        result.style.opacity = '0.25'
                        result.style.transform = 'rotateX(-90deg)'
                        //@ts-ignore
                        result.style.transition_timing_function = 'ease-out'
                        document.onclick = null
                      }
                    } catch {
                      const result = document.getElementById(
                        'result'
                      ) as HTMLDivElement
                      result.style.opacity = '0.25'
                      result.style.transform = 'rotateX(-90deg)'
                      //@ts-ignore
                      result.style.transition_timing_function = 'ease-out'
                      document.onclick = null
                    }
                  }
                }}
                backgroundColor="black"
                iconPosition="right"
                fontSize="xxsmall"
                icon={<Icon icon="icon-magnifier" />}
              />
              <S.SearchResult id="result">
                <S.TitleResult className="result">
                  Mangas Encontrados:
                </S.TitleResult>
                <S.TitleSeparate className="result"></S.TitleSeparate>
                {loading ? (
                  <S.Loading>
                    <Spin tip="Buscando..." />
                  </S.Loading>
                ) : searchResult.mangas.length == 0 ? (
                  <S.ResultNotfound className="result">
                    <Empty
                      className="result"
                      description="Nada encontrado"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </S.ResultNotfound>
                ) : (
                  searchResult.mangas.map((manga, i) => {
                    return (
                      <Link key={i} href={`/manga/${manga.id}`}>
                        <a>
                          <MangaList image={manga.photo} title={manga.name} />
                        </a>
                      </Link>
                    )
                  })
                )}
                <S.TitleResult className="result">
                  Usuários Encontrados:
                </S.TitleResult>
                <S.TitleSeparate className="result"></S.TitleSeparate>
                {loading ? (
                  <S.Loading>
                    <Spin tip="Buscando..." />
                  </S.Loading>
                ) : searchResult.users.length == 0 ? (
                  <S.ResultNotfound className="result">
                    <Empty
                      className="result"
                      description="Nada encontrado"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </S.ResultNotfound>
                ) : (
                  searchResult.users.map((user, i) => {
                    return (
                      <UserList
                        key={i}
                        name={user.name}
                        photo={user.profile_photo}
                      />
                    )
                  })
                )}
              </S.SearchResult>
            </S.SearchTextFild>
          </S.WrapperUserItem>
          <S.WrapperUserItem>
            {/* <Badge content="99+">
              <S.Notify>
                <Icon size={25} />
              </S.Notify>
            </Badge> */}
            <S.Notify>
              <Icon size={25} />
            </S.Notify>
          </S.WrapperUserItem>
          <S.WrapperUserItem>
            <S.User logged={user.logged}>
              {user.logged ? (
                <>
                  <img src={user.data.profile_photo} />
                  <S.WrapperUserSubMenu>
                    <DropdownItem href="/" icon="icon-account" text="Perfil" />
                    <DropdownItem
                      href={`/user/config`}
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
                      href="/sign-in"
                      icon="icon-login"
                      text="Login"
                    />
                    <DropdownItem
                      href="/sign-up"
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
