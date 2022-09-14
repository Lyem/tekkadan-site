/* eslint-disable @typescript-eslint/ban-ts-comment */
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Panel from '../../../../templates/panel'
import * as S from '../../../../styles/panel/manga/mangaUpload.style'
import { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import 'filepond/dist/filepond.min.css'
import TextField from '../../../../components/TextField'
import { MangaService } from '../../../../Services/MangaService'
import Button from '../../../../components/Button'
import { AxiosError } from 'axios'
import { MangaChapterService } from '../../../../Services/MangaChapterService'
import PanelLoading from '../../../../components/PanelLoading'
import NotFound from '../../../../components/404'
import Toast from '../../../../components/Toast'
import { ToastI } from '../../../../Interfaces/ToastInterface'
import { Modal, Progress } from 'antd'

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
)

const MangaUpload = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mangaChapterService = new MangaChapterService()
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)
  const [notFound, setnotFound] = useState(false)
  const [files, setFiles] = useState([])
  const [manga, setManga] = useState({
    photo: '',
    name: 'carregando'
  })
  const [list, setList] = useState([])

  const [values, setValues] = useState({
    title: '',
    number: ''
  })

  const [modal, setModal] = useState(false)

  const [upload, setUpload] = useState(0)

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      setModal(true)

      const page = []

      for (let index = 0; index < files.length; index++) {
        page.push({
          base:
            'data:' +
            // @ts-ignore
            files[index].fileType +
            ';base64,' +
            // @ts-ignore
            files[index].getFileEncodeBase64String(),
          // @ts-ignore
          name: files[index].filename
        })
      }

      mangaChapterService
        .uploadCap(
          Number(id),
          page as [],
          values.number,
          values.title,
          (progressEvent) => {
            setUpload(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )
          }
        )
        .then(() => {
          // @ts-ignore
          showToast({
            id: list.length,
            title: 'Sucesso',
            descrition: 'Upload concluido com sucesso',
            backgroundColor: '#0c3617'
          })
          setFiles([])
          handleInput('title', '')
          handleInput('number', `${+values.number + 1}`)
          setModal(false)
          setUpload(0)
        })
        .catch((error) => {
          // @ts-ignore
          const err = error as AxiosError
          if (err.response?.status == 401) {
            showToast({
              id: list.length,
              title: 'Erro',
              descrition: 'Upload não autorizado',
              backgroundColor: '#4f0505'
            })
          } else {
            showToast({
              id: list.length,
              title: 'Erro',
              descrition: `${err.response?.status}`,
              backgroundColor: '#4f0505'
            })
          }
          setModal(false)
          setUpload(0)
        })
    } catch (error) {
      setModal(false)
      setUpload(0)
      const err = error as AxiosError
      showToast({
        id: list.length,
        title: 'Erro',
        descrition: `${err.response?.status}`,
        backgroundColor: '#4f0505'
      })
    }
  }

  const handleInputManga = (field: string, value: string) => {
    setManga((s) => ({ ...s, [field]: value }))
  }

  const newLocal = async (idd: number) => {
    const mangaService = new MangaService()
    try {
      const mangaa = await mangaService.getMangabyId(idd)
      handleInputManga('photo', mangaa.data.photo)
      handleInputManga('name', mangaa.data.name)
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status == 404) {
        showToast({
          id: list.length,
          title: '404',
          descrition: 'Manga não encontrado',
          backgroundColor: '#b4a62a'
        })
        setnotFound(true)
      }
    }
    setLoading(false)
  }
  const getManga = newLocal

  useEffect(() => {
    if (id && loading) {
      getManga(Number(id))
      try {
        mangaChapterService.getMangaCapsById(+id).then((cap) => {
          let last = 0
          cap.data.data.map((a) => {
            if (+a.chapter > last) {
              last = +a.chapter
            }
          })
          handleInput('number', `${last + 1}`)
        })
      } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.status)
        handleInput('number', '1')
      }
    }
  }, [getManga, id, loading, mangaChapterService])
  if (loading) {
    return (
      <Panel openKey="sub1" keys="/panel/manga/upload">
        <PanelLoading />
      </Panel>
    )
  } else {
    if (notFound) {
      return (
        <Panel openKey="sub1" keys="/panel/manga/upload">
          <Toast toastlist={list} setlist={setList}></Toast>
          <NotFound />
        </Panel>
      )
    }
    return (
      <Panel openKey="sub1" keys="/panel/manga/upload">
        <>
          <Head>
            <title>Tekkadan | Upload {manga.name}</title>
          </Head>
          <S.Wrapper>
            <Toast toastlist={list} setlist={setList}></Toast>
            <Modal
              title="Upando manga"
              centered
              open={modal}
              closable={false}
              footer={[]}
            >
              <S.UploadWrapper>
                <Progress type="circle" percent={upload} />
              </S.UploadWrapper>
            </Modal>
            <S.Manga>
              <S.Image>
                <Image width="110px" height="150px" src={manga.photo}></Image>
              </S.Image>
              <S.Title>{manga.name}</S.Title>
            </S.Manga>
            <form onSubmit={handleSubmit}>
              <S.Infos>
                <S.Cap>
                  <TextField
                    onInputChange={(v) => handleInput('number', v)}
                    required={true}
                    backgroundColor="contrast2"
                    name="chapter"
                    placeholder="Capitulo"
                    value={values.number}
                    type="text"
                  />
                </S.Cap>
                <TextField
                  onInputChange={(v) => handleInput('title', v)}
                  backgroundColor="contrast2"
                  name="chapter_name"
                  placeholder="Nome"
                  value={values.title}
                  type="text"
                />
              </S.Infos>
              <S.Files>
                <FilePond
                  files={files}
                  onupdatefiles={(files) => {
                    const f = files as []
                    setFiles(f)
                  }}
                  allowMultiple={true}
                  allowReorder={true}
                  allowPaste={true}
                  required={true}
                  allowImagePreview={false}
                  allowFileEncode={true}
                  allowFileSizeValidation={true}
                  maxFiles={500}
                  maxFileSize="20mb"
                  maxTotalFileSize="200mb"
                  labelMaxFileSizeExceeded="O arquivo é muito grande"
                  labelMaxFileSize="O tamanho maximo é {filesize}"
                  labelFileTypeNotAllowed="Formato de arquivo invalido"
                  fileValidateTypeLabelExpectedTypes="Esperado {allButLastType} ou {lastType}"
                  labelMaxTotalFileSizeExceeded="O tamanho total dos arquivos foi excedido"
                  labelMaxTotalFileSize="O limite total é {filesize}"
                  name="files"
                  acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
                  credits={false}
                  labelIdle='Jogue as imagens em cima de mim ou <span class="filepond--label-action">Procure</span>'
                />
              </S.Files>
              <S.WrapperButton>
                <S.Button>
                  <Button fullWidth={true}>Upar</Button>
                </S.Button>
              </S.WrapperButton>
            </form>
            <S.WrapperButton2>
              <S.Button>
                <Button
                  onClick={() => {
                    setFiles([])
                  }}
                  fullWidth={true}
                >
                  Limpar
                </Button>
              </S.Button>
            </S.WrapperButton2>
          </S.Wrapper>
        </>
      </Panel>
    )
  }
}

export default MangaUpload
