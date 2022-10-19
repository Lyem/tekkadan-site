import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import Head from 'next/head'
import { Popconfirm, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import Link from 'next/link'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { StatusService } from '../../../Services/StatusService'

const Status = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  const statusService = new StatusService()

  interface DataType {
    key: React.Key
    id: number
    name: string
  }

  const getStatus = () => {
    setLoading(true)
    statusService.getAllStatus().then((response) => {
      setList(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Panel>
        <Head>
          <title>Tekkadan | Status</title>
        </Head>
        <S.Wrapper>
          <Table pagination={false} loading={loading} dataSource={list}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Nome" dataIndex="name" key="name" />
            <Column
              title="Ações"
              key="action"
              render={(record: DataType) => (
                <Space size="middle">
                  <Link href={`/panel/format/edit/${record.id}`}>
                    <a style={{ color: 'white' }}>Editar</a>
                  </Link>
                  <Popconfirm
                    title="Você tem certeza?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() =>
                      new Promise((resolve) => {
                        statusService.deleteStatus(record.id).then(() => {
                          getStatus()
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

export default Status
