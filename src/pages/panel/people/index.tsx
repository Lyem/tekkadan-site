import { QuestionCircleOutlined } from '@ant-design/icons'
import { Popconfirm, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import Head from 'next/head'
import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import { useEffect, useState } from 'react'
import { PeopleService } from '../../../Services/PeopleService'
import Link from 'next/link'

const People = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  const peopleService = new PeopleService()

  interface DataType {
    key: React.Key
    id: number
    name: string
  }

  const getPeople = () => {
    setLoading(true)
    peopleService.getAllPeople().then((response) => {
      setList(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getPeople()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Panel>
        <S.Wrapper>
          <Head>
            <title>Tekkadan | Mangas</title>
          </Head>

          <Table pagination={false} loading={loading} dataSource={list}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Nome" dataIndex="name" key="name" />
            <Column
              title="Ações"
              key="action"
              render={(record: DataType) => (
                <Space size="middle">
                  <Link href={`/panel/people/edit/${record.id}`}>
                    <a style={{ color: 'white' }}>Editar</a>
                  </Link>
                  <Popconfirm
                    title="Você tem certeza?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() =>
                      new Promise((resolve) => {
                        peopleService.deletePeople(record.id).then(() => {
                          getPeople()
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

export default People
