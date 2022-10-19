import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import Head from 'next/head'
import { Popconfirm, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import Link from 'next/link'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { CategoryService } from '../../../Services/CategoryService'

const Category = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  const categoryService = new CategoryService()

  interface DataType {
    key: React.Key
    id: number
    name: string
  }

  const getCategory = () => {
    setLoading(true)
    categoryService.getAllCategory().then((response) => {
      setList(response.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    getCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Panel>
        <S.Wrapper>
          <Head>
            <title>Tekkadan | Categoria</title>
          </Head>
          <Table pagination={false} loading={loading} dataSource={list}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Nome" dataIndex="name" key="name" />
            <Column
              title="Ações"
              key="action"
              render={(record: DataType) => (
                <Space size="middle">
                  <Link href={`/panel/category/edit/${record.id}`}>
                    <a style={{ color: 'white' }}>Editar</a>
                  </Link>
                  <Popconfirm
                    title="Você tem certeza?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() =>
                      new Promise((resolve) => {
                        categoryService.deleteCategory(record.id).then(() => {
                          getCategory()
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

export default Category
