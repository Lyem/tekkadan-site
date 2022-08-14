import OverView from '../../templates/overView'
import * as S from '../../styles/manga.style'
import Image from 'next/image'
import Icon from '../../components/Icon'
import Head from 'next/head'
import { MangaService } from '../../Services/MangaService'
//import { useEffect } from 'react'
import { Manga } from '../../Interfaces/MangaInterface'
import { MangaChapterService } from '../../Services/MangaChapterService'
import Link from 'next/link'
import { MangaChapter } from '../../Interfaces/MangaChapterInterface'
import Tag from '../../components/Tag'

export type MangaOverViewProps = {
  manga: Manga
  chapter: MangaChapter[]
}

const MangaOverView = ({ manga, chapter }: MangaOverViewProps) => {
  // useEffect(() => {
  //   console.log(manga)
  // }, [manga])

  return (
    <>
      <Head>
        <title>Tekkadan | {manga.name}</title>
        <meta name="description" content={manga.synopsis} />
      </Head>
      <OverView
        background={manga.background_photo}
        transparency={true}
        fixed={true}
      >
        <S.Wrapper>
          <S.Cover>
            <Image src={manga.photo} width="512px" height="720px"></Image>
          </S.Cover>
          <S.WrapperTitle>
            <S.Title>{manga.name}</S.Title>
            <S.points>
              <Icon icon="icon-star" color="yellow" size={25} /> {manga.score}
            </S.points>
          </S.WrapperTitle>
          <S.synopsis>{manga.synopsis}</S.synopsis>
          <S.WrapperSide>
            <S.WrapperInfos>
              <S.WrapperVar>
                <S.Var>
                  <strong>Visualizações:</strong> {manga.views}
                </S.Var>
              </S.WrapperVar>
              <S.WrapperVar>
                <S.Var>
                  <strong>Formato:</strong> {manga.format.name}
                </S.Var>
              </S.WrapperVar>
              <S.WrapperVar>
                <S.Var>Categorias:</S.Var>
                {manga.categories.map((category, i) => {
                  return <Tag key={i} text={category.name}></Tag>
                })}
              </S.WrapperVar>
              <S.WrapperVar>
                <S.Var>Staff:</S.Var>
                {manga.people.map((staff, i) => {
                  return <Tag key={i} text={staff.name}></Tag>
                })}
              </S.WrapperVar>
              <S.WrapperVar>
                <S.Var>
                  <strong>Status:</strong> {manga.status.name}
                </S.Var>
              </S.WrapperVar>
            </S.WrapperInfos>
            <S.WrapperCaps>
              {chapter.map((ch, i) => {
                return (
                  <Link key={i} href={`/manga/reader/${ch.id}`}>
                    <S.Caps>
                      <S.CapText>
                        Capitulo {ch.chapter} - {ch.title}
                      </S.CapText>
                      <S.CapText>
                        {new Date(ch.created_at).toLocaleDateString('pt-BR')}
                      </S.CapText>
                    </S.Caps>
                  </Link>
                )
              })}
            </S.WrapperCaps>
          </S.WrapperSide>
        </S.Wrapper>
      </OverView>
    </>
  )
}

export const getStaticPaths = async () => {
  const mangaService = new MangaService()
  const mangasId = await mangaService.getAllMangaIds()
  const paths = mangasId.data.map((manga) => ({
    params: { id: `${manga.id}` }
  }))
  return {
    paths: paths,
    fallback: false
  }
}

export type StaticProps = {
  params: { id: number }
}

export const getStaticProps = async ({ params }: StaticProps) => {
  let manga = null
  let chapter = null
  const mangaService = new MangaService()
  const chapterService = new MangaChapterService()

  try {
    manga = await mangaService.getMangabyId(params.id)
    chapter = await chapterService.getMangaAllCapsById(params.id)
    manga = manga.data
    chapter = chapter.data
  } catch (e) {
    manga = null
  }

  if (!manga) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      manga,
      chapter
    }
  }
}

export default MangaOverView
