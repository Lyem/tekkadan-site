import { useRouter } from 'next/router'
import Panel from '../../../../templates/panel'
import * as S from '../../../../styles/panel/manga/manga.style'
import Head from 'next/head'
import { Popconfirm, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { MangaChapterService } from '../../../../Services/MangaChapterService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const Chapter = () => {
  const router = useRouter()
  const { id } = router.query
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector((state: RootState) => state.user)

  interface DataType {
    key: React.Key
    id: number
    chapter: string
    title: string
  }

  const chapterService = new MangaChapterService()

  const getChapters = () => {
    setLoading(true)
    chapterService.getMangaAllCapsById(Number(id)).then((response) => {
      setList(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (id) {
      getChapters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <Panel>
        <S.Wrapper>
          <Head>
            <title>Tekkadan | Mangas</title>
          </Head>

          <Table pagination={false} loading={loading} dataSource={list}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Capitulo" dataIndex="chapter" key="chapter" />
            <Column title="Nome" dataIndex="title" key="title" />
            <Column
              title="Ações"
              key="action"
              render={(record: DataType) => (
                <Space size="middle">
                  <a style={{ color: 'white' }}>Editar</a>
                  <Popconfirm
                    title="Você tem certeza?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() =>
                      new Promise((resolve) => {
                        chapterService.delete(record.id).then(() => {
                          fetch(
                            `/api/manga/reader?secret=${user.data.front_token}&id=${record.id}`
                          )
                          fetch(
                            `/api/manga?secret=${user.data.front_token}&id=${id}`
                          )
                          getChapters()
                          resolve(null)
                        })
                      })
                    }
                    cancelText="Cancelar"
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
    </>
  )
}

export default Chapter
