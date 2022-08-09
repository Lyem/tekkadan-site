/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from '../../../components/Footer'
import NavBar from '../../../components/NavBar'
import { MangaChapter } from '../../../Interfaces/MangaChapterInterface'
import { Manga } from '../../../Interfaces/MangaInterface'
import { MangaChapterService } from '../../../Services/MangaChapterService'
import { MangaService } from '../../../Services/MangaService'
import * as S from '../../../styles/mangaReader.style'
import Image from 'next/image'
import IconButton from '../../../components/IconButton'
import Icon from '../../../components/Icon'
import { useEffect, useState } from 'react'
import { Slider } from 'rsuite'
import debounce from '../../../shared/debounce'
import { setCookie, parseCookies } from 'nookies'

export type CapsProps = {
  chapter: MangaChapter
  manga: Manga
}

const MangaReader = ({ chapter, manga }: CapsProps) => {
  const router = useRouter()
  const { id } = router.query
  const cookies = parseCookies()

  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState(false)
  const [size, setSize] = useState(35)
  const [quality, setQuality] = useState(100)

  useEffect(() => {
    if (cookies.NAV_OPEN) {
      setOpen(cookies.NAV_OPEN === 'true')
    }
    if (cookies.READER_ZOOM) {
      setSize(+cookies.READER_ZOOM)
    }
    if (cookies.READER_QUALITY) {
      setQuality(+cookies.READER_QUALITY)
    }
  }, [cookies])

  return (
    <>
      <Head>
        <title>
          Tekkadan | {manga.name} - Capitulo {chapter.chapter} - {chapter.title}
        </title>
      </Head>
      <S.Wrapper>
        <NavBar />
        <S.SideMenu open={open}>
          <S.cover url={manga.background_photo}>
            <S.infos>
              <Image width={100} height={140} src={manga.photo} />
              <S.infosTitle>{manga.name}</S.infosTitle>
            </S.infos>
          </S.cover>
        </S.SideMenu>
        <S.Reader open={open}>
          <S.WrapperMenuButtons open={open}>
            <IconButton
              onClick={() => {
                setCookie(null, 'NAV_OPEN', `${!open}`, {
                  maxAge: 86400 * 7,
                  path: '/manga/reader/'
                })
                setOpen(!open)
              }}
            >
              {open ? (
                <Icon size={25} icon="icon-forward" />
              ) : (
                <Icon size={25} icon="icon-back-arrow" />
              )}
            </IconButton>
            <IconButton>
              <Icon size={25} icon="icon-chat" />
            </IconButton>
            <IconButton>
              <Icon size={25} icon="icon-love" />
            </IconButton>
            <div>
              <IconButton
                id="config"
                onClick={() => {
                  if (!config) {
                    document.onclick = function (e) {
                      //@ts-ignore
                      const cla = e.target.className
                      //@ts-ignore
                      const id = e.target.id

                      if (
                        id != 'config' &&
                        id != 'confIcon' &&
                        cla != 'rs-slider-handle' &&
                        cla != 'rs-slider-bar' &&
                        cla != 'rs-slider-progress-bar' &&
                        cla != 'rs-slider-pass rs-slider-active' &&
                        cla != 'rs-theme-dark rs-slider rs-slider-graduated'
                      ) {
                        setConfig(false)
                        document.onclick = null
                      }
                    }
                    setConfig(!config)
                  } else {
                    setConfig(!config)
                    document.onclick = null
                  }
                }}
              >
                <Icon id="confIcon" size={25} icon="icon-setting" />
              </IconButton>
              <S.Config
                id="config"
                className="config"
                open={open}
                config={config}
              >
                <S.confTitle>Zoom:</S.confTitle>
                <Slider
                  className="rs-theme-dark"
                  value={size}
                  min={10}
                  step={5}
                  max={100}
                  graduated
                  progress
                  onChange={(mark) => {
                    debounce(() => {
                      setCookie(null, 'READER_ZOOM', `${mark}`, {
                        maxAge: 86400 * 7,
                        path: '/manga/reader/'
                      })
                      setSize(mark)
                    }, 100)
                  }}
                />
                <br />
                <S.confTitle>Qualidade:</S.confTitle>
                <Slider
                  className="rs-theme-dark"
                  value={quality}
                  min={10}
                  step={10}
                  max={100}
                  graduated
                  progress
                  onChange={(mark) => {
                    debounce(() => {
                      setCookie(null, 'READER_QUALITY', `${mark}`, {
                        maxAge: 86400 * 7,
                        path: '/manga/reader/'
                      })
                      setQuality(mark)
                    }, 100)
                  }}
                />
              </S.Config>
            </div>
          </S.WrapperMenuButtons>
          <S.Division>
            <S.Title>
              {chapter.chapter} - {chapter.title}
            </S.Title>
            <S.Date>
              {new Date(chapter.created_at).toLocaleDateString('pt-BR')}
            </S.Date>
          </S.Division>
          <S.Image size={size} open={open}>
            {chapter.manga_pages.map((page, i) => {
              return (
                <Image
                  key={i}
                  alt={`${manga.name} - Capitulo ${chapter.chapter} - pagina ${
                    i + 1
                  }`}
                  height={page.height}
                  width={page.width}
                  src={`${page.page}`}
                  quality={quality}
                  layout="responsive"
                  // onLoad={(event) => {
                  //   const target = event.target

                  //   console.log(target)
                  // }}
                />
              )
            })}
          </S.Image>
          <Footer />
        </S.Reader>
      </S.Wrapper>
    </>
  )
}

export const getStaticPaths = async () => {
  const chapterService = new MangaChapterService()
  const mangasId = await chapterService.getIds()
  const paths = mangasId.data.map((ch) => ({
    params: { id: `${ch.id}` }
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
  let chapter = null
  let manga = null
  const mangaService = new MangaService()
  const chapterService = new MangaChapterService()
  try {
    chapter = await chapterService.getCapById(params.id)
    chapter = chapter.data
    manga = await mangaService.getMangabyId(chapter.manga_over_view_id)
    manga = manga.data
  } catch (e) {
    manga = null
    chapter = null
  }
  if (!chapter) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      chapter,
      manga
    }
  }
}

export default MangaReader
