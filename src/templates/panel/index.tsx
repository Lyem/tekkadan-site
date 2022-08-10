import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import * as S from './style'
import { Sidenav, Nav, Sidebar } from 'rsuite'
import Dashboard from '@rsuite/icons/Dashboard'
import PeoplesIcon from '@rsuite/icons/Peoples'
import ImageIcon from '@rsuite/icons/Image'
import PageIcon from '@rsuite/icons/Page'
import OthersIcon from '@rsuite/icons/Others'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

type PanelProps = {
  children: React.ReactNode
}

const Panel = ({ children }: PanelProps) => {
  const cookies = parseCookies()
  const [expand, setExpand] = useState(true)

  useEffect(() => {
    if (cookies.PANEL_NAV_OPEN) {
      setExpand(cookies.PANEL_NAV_OPEN === 'true')
    }
  }, [cookies])

  return (
    <>
      <NavBar />
      <S.Wrapper expand={expand}>
        <S.NavWrapper expand={expand}>
          <Sidebar
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 62px)'
            }}
            className="rs-theme-dark"
            collapsible
          >
            <Sidenav
              expanded={expand}
              style={{ minHeight: 'calc(100vh - 62px)' }}
              //defaultOpenKeys={['3']}
            >
              <Sidenav.Body
                style={
                  expand
                    ? {
                        overflow: 'hidden',
                        overflowY: 'scroll'
                      }
                    : {}
                }
              >
                <Nav>
                  <Nav.Item
                    onClick={() => Router.push('/panel')}
                    eventKey="1"
                    active
                    icon={<Dashboard />}
                  >
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<PeoplesIcon />}>
                    Usuários
                  </Nav.Item>
                  <Nav.Menu eventKey="3" title="Mangá" icon={<ImageIcon />}>
                    <Nav.Item
                      onClick={() => Router.push('/panel/manga')}
                      eventKey="3-1"
                    >
                      Mangás
                    </Nav.Item>
                    <Nav.Item
                      onClick={() => Router.push('/panel/manga/create')}
                      eventKey="3-2"
                    >
                      Criar Mangá
                    </Nav.Item>
                    <Nav.Menu eventKey="3-3" title="Capítulo">
                      <Nav.Item eventKey="3-3-1">Capítulos</Nav.Item>
                      <Nav.Item
                        onClick={() => Router.push('/panel/manga/upload')}
                        eventKey="3-3-2"
                      >
                        Upar Capítulo
                      </Nav.Item>
                    </Nav.Menu>
                  </Nav.Menu>
                  <Nav.Menu eventKey="4" title="Novel" icon={<PageIcon />}>
                    <Nav.Item eventKey="4-1">Novels</Nav.Item>
                    <Nav.Item eventKey="4-2">Criar Novel</Nav.Item>
                    <Nav.Menu eventKey="4-5" title="Capítulo">
                      <Nav.Item eventKey="4-5-1">Capítulos</Nav.Item>
                      <Nav.Item eventKey="4-5-2">Upar Capítulo</Nav.Item>
                    </Nav.Menu>
                  </Nav.Menu>
                  <Nav.Menu eventKey="5" title="Outros" icon={<OthersIcon />}>
                    <Nav.Menu eventKey="5-1" title="Categoria">
                      <Nav.Item eventKey="5-1-2">Categorias</Nav.Item>
                      <Nav.Item
                        onClick={() => Router.push('/panel/category/create')}
                        eventKey="5-1-1"
                      >
                        Criar Categoria
                      </Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="5-2" title="Pessoa">
                      <Nav.Item eventKey="5-2-1">Pessoas</Nav.Item>
                      <Nav.Item
                        onClick={() => Router.push('/panel/people/create')}
                        eventKey="5-2-2"
                      >
                        Criar Pessoa
                      </Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="5-3" title="Formato">
                      <Nav.Item eventKey="5-3-1">Formatos</Nav.Item>
                      <Nav.Item
                        onClick={() => Router.push('/panel/format/create')}
                        eventKey="5-3-2"
                      >
                        Criar Formato
                      </Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu eventKey="5-4" title="Status">
                      <Nav.Item eventKey="5-4-1">Status</Nav.Item>
                      <Nav.Item
                        onClick={() => Router.push('/panel/status/create')}
                        eventKey="5-4-2"
                      >
                        Criar Status
                      </Nav.Item>
                    </Nav.Menu>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
              <Sidenav.Toggle
                onClick={() => {
                  setCookie(null, 'PANEL_NAV_OPEN', `${!expand}`, {
                    maxAge: 86400 * 7,
                    path: '/panel'
                  })
                  setExpand(!expand)
                }}
              />
            </Sidenav>
          </Sidebar>
        </S.NavWrapper>
        <S.WrapperChild>{children}</S.WrapperChild>
      </S.Wrapper>
    </>
  )
}

export default Panel
