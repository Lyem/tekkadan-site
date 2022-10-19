import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import { MangaService } from '../../../Services/MangaService'
import { useEffect, useState } from 'react'
import { Popconfirm, Space, Table } from 'antd'
import Link from 'next/link'
import { MangaList } from '../../../Interfaces/MangaListInterface'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Head from 'next/head'
import TextField from '../../../components/TextField'
import Icon from '../../../components/Icon'
import debounce from '../../../shared/debounce'
import { SearchService } from '../../../Services/SearchService'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { MangaChapterService } from '../../../Services/MangaChapterService'

const Mangas = () => {
  const [loading, setLoading] = useState(true)
  const [pagePosition, setPagePosition] = useState(1)
  const user = useSelector((state: RootState) => state.user)

  interface DataType {
    key: React.Key
    id: number
    name: string
    sinopse: number
    views: string
  }

  const [list, setList] = useState({} as MangaList)

  const manga = new MangaService()
  const searchService = new SearchService()

  const fetchAllMangas = async (page?: number) => {
    const mangas = await manga.getAll(page)
    setList(mangas.data)
    setLoading(false)
  }

  const { Column } = Table

  useEffect(() => {
    fetchAllMangas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Panel>
      <S.Wrapper>
        <Head>
          <title>Tekkadan | Mangas</title>
        </Head>
        <TextField
          onInputChange={(v) =>
            debounce(async () => {
              if (v != '') {
                setLoading(true)
                const search = await searchService.MangaSearch(v)
                setList({
                  current_page: 1,
                  data: search.data,
                  first_page_url: '',
                  from: 1,
                  last_page: 1,
                  last_page_url: '',
                  links: [],
                  next_page_url: '',
                  path: '',
                  per_page: 1,
                  prev_page_url: '',
                  to: 1,
                  total: search.data.length
                })
                setLoading(false)
              } else {
                fetchAllMangas()
              }
            }, 200)
          }
          placeholder="Pesquise a obra"
          iconPosition="right"
          fontSize="xxsmall"
          icon={<Icon icon="icon-magnifier" />}
          backgroundColor="contrast2"
        />
        <div style={{ marginTop: '5px' }} />
        <Table
          pagination={{
            total: list.total,
            onChange(page) {
              setLoading(true)
              setPagePosition(page)
              fetchAllMangas(page)
            }
          }}
          loading={loading}
          dataSource={list.data}
        >
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
                <Link href={`/panel/manga/chapter/${record.id}`}>
                  <a style={{ color: 'white' }}>Caps</a>
                </Link>
                <Link href={`/panel/manga/upload/${record.id}`}>
                  <a style={{ color: 'white' }}>Upar</a>
                </Link>
                <Popconfirm
                  title="Você tem certeza?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() =>
                    new Promise((resolve) => {
                      const chapterService = new MangaChapterService()
                      chapterService
                        .getMangaAllCapsById(record.id)
                        .then((response) => {
                          response.data.map((data) => {
                            fetch(
                              `/api/manga/reader?secret=${user.data.front_token}&id=${data.id}`
                            )
                          })
                          manga.deleteMangabyId(record.id).then(() => {
                            fetch(
                              `/api/manga?secret=${user.data.front_token}&id=${record.id}`
                            )
                            setLoading(true)
                            if (list.data.length == 1 && pagePosition !== 1) {
                              fetchAllMangas(pagePosition - 1).then(() =>
                                resolve(null)
                              )
                              setPagePosition(pagePosition - 1)
                            } else {
                              fetchAllMangas(pagePosition).then(() =>
                                resolve(null)
                              )
                            }
                          })
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
  )
}

export default Mangas
