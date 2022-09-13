import { Table } from 'rsuite'
import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/manga/manga.style'
import { MangaService } from '../../../Services/MangaService'
import { useEffect, useState } from 'react'
import PanelLoading from '../../../components/PanelLoading'
//import { Manga2 } from '../../../Interfaces/Manga2Interface'

const Mangas = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])

  const fetchAllMangas = async () => {
    const manga = new MangaService()
    const mangas = await manga.getAll()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setList(mangas.data.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllMangas()
  }, [])

  if (loading) {
    return (
      <Panel>
        <PanelLoading />
      </Panel>
    )
  }

  return (
    <Panel openKey="sub1" keys="/panel/manga">
      <S.Wrapper>
        <Table height={850} data={list} className="rs-theme-dark">
          <Table.Column width={70} align="center" fixed>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column width={300} fixed>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column width={690}>
            <Table.HeaderCell>Sinopse</Table.HeaderCell>
            <Table.Cell dataKey="synopsis" />
          </Table.Column>

          <Table.Column width={200}>
            <Table.HeaderCell>views</Table.HeaderCell>
            <Table.Cell dataKey="views" />
          </Table.Column>

          <Table.Column width={250}>
            <Table.HeaderCell>Action</Table.HeaderCell>

            <Table.Cell>
              {(rowData) => {
                function handleAction() {
                  alert(`id:${rowData.id}`)
                }

                return (
                  <span>
                    <a onClick={handleAction}> Editar </a> |{' '}
                    <a onClick={handleAction}> Caps </a> |{' '}
                    <a href={`/panel/manga/upload/${rowData.id}`}> Upar </a> |{' '}
                    <a onClick={handleAction}> Deletar </a>
                  </span>
                )
              }}
            </Table.Cell>
          </Table.Column>
        </Table>
      </S.Wrapper>
    </Panel>
  )
}

export default Mangas
