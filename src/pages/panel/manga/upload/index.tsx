import TextField from '../../../../components/TextField'
import Panel from '../../../../templates/panel'
import * as S from '../../../../styles/panel/manga/mangaUploadSearch.style'
import Icon from '../../../../components/Icon'
import MangaList from '../../../../components/MangaList'
import { useState } from 'react'
import PanelLoading from '../../../../components/PanelLoading'
import { SearchService } from '../../../../Services/SearchService'
import { Manga2 } from '../../../../Interfaces/Manga2Interface'
import debounce from '../../../../shared/debounce'
import Link from 'next/link'

const SelectManga = () => {
  const [loading, setLoading] = useState(false)
  const [mangas, setMangas] = useState([] as Manga2[])

  const searchService = new SearchService()

  return (
    <Panel openKey={['sub1']} keys="/panel/manga/upload">
      <S.Wrapper>
        <S.WrapperSearch>
          <TextField
            onInputChange={(v) =>
              debounce(async () => {
                if (v != '') {
                  setLoading(true)
                  const search = await searchService.MangaSearch(v)
                  setMangas(search.data)
                  setLoading(false)
                } else {
                  setMangas([])
                }
              })
            }
            placeholder="Pesquise a obra"
            iconPosition="right"
            fontSize="xxsmall"
            icon={<Icon icon="icon-magnifier" />}
            backgroundColor="contrast2"
          />
          {loading ? (
            <PanelLoading />
          ) : mangas.length == 0 ? (
            <S.NoContent>Nada encontrado</S.NoContent>
          ) : (
            mangas.map((m, i) => (
              <Link key={i} href={`/panel/manga/upload/${m.id}`}>
                <a>
                  <MangaList image={m.photo} title={m.name} />
                </a>
              </Link>
            ))
          )}
        </S.WrapperSearch>
      </S.Wrapper>
    </Panel>
  )
}

export default SelectManga
