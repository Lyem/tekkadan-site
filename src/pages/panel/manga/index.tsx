import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import { MangaService } from '../../../Services/MangaService'
import { useEffect, useState } from 'react'
import PanelLoading from '../../../components/PanelLoading'
import { Popconfirm, Space, Table } from 'antd'
import Link from 'next/link'
import { MangaList } from '../../../Interfaces/MangaListInterface'
import { QuestionCircleOutlined } from '@ant-design/icons'

const Mangas = () => {
  const [loading, setLoading] = useState(true)
  interface DataType {
    key: React.Key
    id: number
    name: string
    sinopse: number
    views: string
  }

  const [list, setList] = useState({} as MangaList)

  const fetchAllMangas = async () => {
    const manga = new MangaService()
    const mangas = await manga.getAll()
    setList(mangas.data)
    setLoading(false)
  }

  const { Column } = Table

  useEffect(() => {
    fetchAllMangas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // if (loading) {
  //   return (
  //     <Panel>
  //       <PanelLoading />
  //     </Panel>
  //   )
  // }

  return (
    <Panel openKey="sub1" keys="/panel/manga">
      <S.Wrapper>
        <Table pagination={list} loading={loading} dataSource={list.data}>
          <Column title="Id" dataIndex="id" key="id" />
          <Column title="Nome" dataIndex="name" key="name" />
          <Column title="Sinopse" dataIndex="synopsis" key="synopsis" />
          <Column title="Views" dataIndex="views" key="views" />
          <Column
            title="Ações"
            key="action"
            render={(record: DataType) => (
              <Space size="middle">
                <a style={{ color: 'white' }}>Editar</a>
                <a style={{ color: 'white' }}>Caps</a>
                <Link href={`/panel/manga/upload/${record.id}`}>
                  <a style={{ color: 'white' }}>Upar</a>
                </Link>
                <Popconfirm
                  title="Você tem certeza?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  cancelText="Não"
                  okText="Sim"
                >
                  <a style={{ color: 'red' }}>Deletar</a>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </S.Wrapper>
    </Panel>
  )
}

export default Mangas
