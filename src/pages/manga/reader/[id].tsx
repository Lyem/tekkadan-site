/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head'
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
import Link from 'next/link'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export type CapsProps = {
  chapter: MangaChapter
  manga: Manga
}

function useCap(id: number) {
  const [caps, setCaps] = useState([] as MangaChapter[])

  useEffect(() => {
    const chapterService = new MangaChapterService()
    chapterService.getMangaAllCapsById(id).then((c) => setCaps(c.data))
  }, [id])

  return caps
}

function useChargeCap(caps: MangaChapter[], next: boolean, idCap: number) {
  const [id, setId] = useState(0)

  useEffect(() => {
    caps.map((ch, i) => {
      if (ch.id === idCap) {
        if (!next) {
          if (i != 0) {
            setId(caps[i - 1].id)
          } else {
            setId(0)
          }
        }
        if (next) {
          if (i != caps.length - 1) {
            setId(caps[i + 1].id)
          } else {
            setId(0)
          }
        }
      }
    })
  }, [caps, idCap, next])

  return id
}

const MangaReader = ({ chapter, manga }: CapsProps) => {
  const cookies = parseCookies()

  const [open, setOpen] = useState(false)
  const [config, setConfig] = useState(false)
  const [load, setLoad] = useState(true)
  const [size, setSize] = useState(35)
  const [quality, setQuality] = useState(100)
  const [sizeView, setSizeView] = useState(35)
  const [qualityView, setQualityView] = useState(100)
  const caps = useCap(manga.id)
  const nextCh = useChargeCap(caps, true, chapter.id)
  const previousCh = useChargeCap(caps, false, chapter.id)

  const STATE_MACHINE_NAME = 'Basic State Macine'
  const INPUT_NAME = 'Switch'
  const { rive, RiveComponent } = useRive({
    src: '/rive/hamburger_time.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true
  })

  const onClickInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_NAME
  )

  useEffect(() => {
    if (load) {
      setLoad(false)
      if (cookies.NAV_OPEN) {
        setOpen(cookies.NAV_OPEN === 'true')

        if (cookies.NAV_OPEN === 'true') {
          onClickInput?.fire()
        }
      }
      if (cookies.READER_ZOOM) {
        setSize(+cookies.READER_ZOOM)
        setSizeView(+cookies.READER_ZOOM)
      }
      if (cookies.READER_QUALITY) {
        setQuality(+cookies.READER_QUALITY)
        setQualityView(+cookies.READER_QUALITY)
      }
    }
  }, [cookies, onClickInput, load])

  return (
    <S.WrapperRoot>
      <Head>
        <title>
          Tekkadan | {manga.name} - Capitulo {chapter.chapter} - {chapter.title}
        </title>
      </Head>
      <NavBar />
      <S.Wrapper>
        <S.SideMenu open={open}>
          <S.cover url={manga.background_photo}>
            <S.infos>
              <Image width={100} height={140} src={manga.photo} />
              <S.infosTitle>{manga.name}</S.infosTitle>
            </S.infos>
          </S.cover>
          <S.WrapperCaps>
            {caps.map((cap, i) => (
              <Link href={`/manga/reader/${cap.id}`} key={i}>
                <S.Cap>
                  Capitulo {cap.chapter} - {cap.title}
                </S.Cap>
              </Link>
            ))}
          </S.WrapperCaps>
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
                onClickInput?.fire()
              }}
            >
              <RiveComponent style={{ height: '25px', width: '25px' }} />
            </IconButton>

            <IconButton>
              <Icon size={25} icon="icon-chat" />
            </IconButton>
            <IconButton>
              <Icon size={25} icon="icon-love" />
            </IconButton>
            {previousCh == 0 ? (
              <IconButton disabled>
                <Icon size={25} icon="icon-back-arrow" />
              </IconButton>
            ) : (
              <Link href={`/manga/reader/${previousCh}`}>
                <IconButton>
                  <Icon size={25} icon="icon-back-arrow" />
                </IconButton>
              </Link>
            )}
            {nextCh == 0 ? (
              <IconButton disabled>
                <Icon size={25} icon="icon-forward" />
              </IconButton>
            ) : (
              <Link href={`/manga/reader/${nextCh}`}>
                <IconButton>
                  <Icon size={25} icon="icon-forward" />
                </IconButton>
              </Link>
            )}
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
                  value={sizeView}
                  min={10}
                  step={5}
                  max={100}
                  graduated
                  progress
                  onChange={(mark) => {
                    setSizeView(mark)
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
                  value={qualityView}
                  min={10}
                  step={10}
                  max={100}
                  graduated
                  progress
                  onChange={(mark) => {
                    setQualityView(mark)
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
    </S.WrapperRoot>
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
