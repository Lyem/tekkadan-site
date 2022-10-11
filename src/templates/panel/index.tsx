import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import * as S from './style'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import Sider from 'antd/lib/layout/Sider'
import {
  MessageOutlined,
  PieChartOutlined,
  ReadOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'

type PanelProps = {
  keys?: string
  openKey?: string[]
  children: React.ReactNode
}

const Panel = ({ openKey = [''], keys = '1', children }: PanelProps) => {
  const [expand, setExpand] = useState(true)
  const router = useRouter()

  type MenuItem = Required<MenuProps>['items'][number]

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label
    } as MenuItem
  }

  const items: MenuProps['items'] = [
    getItem('Dashboard', '/panel', <PieChartOutlined />),
    getItem('Usuários', '2', <TeamOutlined />),
    getItem('Mangá', 'sub1', <ReadOutlined />, [
      getItem('Mangas', '/panel/manga'),
      getItem('Upload', '/panel/manga/upload'),
      getItem('Criar Manga', '/panel/manga/create')
    ]),
    getItem('Novel', 'sub2', <ReadOutlined />, [
      getItem('Novels', '6'),
      getItem('Team 2', '8')
    ]),
    getItem('Outros', 'sub3', <MessageOutlined />, [
      getItem('Pessoa', 'sub4', null, [
        getItem('Criar Pessoa', '/panel/people/create')
      ]),
      getItem('Categoria', 'sub5', null, [
        getItem('Criar Categoria', '/panel/category/create')
      ]),
      getItem('Formato', 'sub6', null, [
        getItem('Criar Formato', '/panel/format/create')
      ]),
      getItem('Status', 'sub7', null, [
        getItem('Criar Status', '/panel/status/create')
      ]),
      getItem('Banner', 'sub8', null, [
        getItem('Add Banner', '/panel/carousel/create')
      ])
    ])
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  return (
    <>
      <NavBar />
      <S.Wrapper expand={expand}>
        <S.NavWrapper expand={expand}>
          <Sider
            collapsible
            collapsed={!expand}
            onCollapse={(value) => setExpand(!value)}
          >
            <Menu
              theme="dark"
              onClick={onClick}
              defaultSelectedKeys={[keys]}
              defaultOpenKeys={openKey}
              mode={`${expand ? 'inline' : 'vertical'}`}
              inlineCollapsed={!expand}
              style={{ height: 'calc(90vh - 62px)' }}
              items={items}
            />
          </Sider>
        </S.NavWrapper>
        <S.WrapperChild>
          <S.WrapperChild>
            {children}
            <Footer />
          </S.WrapperChild>
        </S.WrapperChild>
      </S.Wrapper>
    </>
  )
}

export default Panel
