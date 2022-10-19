/* eslint-disable @typescript-eslint/ban-ts-comment */
import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/carousel/carouselCreate.style'
import { Empty, Select, Spin } from 'antd'
import { useState } from 'react'
import debounce from '../../../shared/debounce'
import { SearchService } from '../../../Services/SearchService'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import Button from '../../../components/Button'
import Toast from '../../../components/Toast'
import { ToastI } from '../../../Interfaces/ToastInterface'
import { SliderService } from '../../../Services/SliderService'

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
)

const CreateCarousel = () => {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const search = new SearchService()
  const [manga, setManga] = useState('')
  const [background, setBackground] = useState([])
  const [title, setTitle] = useState([])
  const [list, setList] = useState([])
  const sliderService = new SliderService()

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const back = []

      for (let index = 0; index < background.length; index++) {
        back.push({
          base:
            'data:' +
            // @ts-ignore
            background[index].fileType +
            ';base64,' +
            // @ts-ignore
            background[index].getFileEncodeBase64String(),
          // @ts-ignore
          name: background[index].filename
        })
      }

      // @ts-ignore
      const titl = []

      for (let index = 0; index < title.length; index++) {
        titl.push({
          base:
            'data:' +
            // @ts-ignore
            title[index].fileType +
            ';base64,' +
            // @ts-ignore
            title[index].getFileEncodeBase64String(),
          // @ts-ignore
          name: title[index].filename
        })
      }
      await sliderService.createSlide(back as [], titl as [], manga)
      //await categoryService.createCategory(name)
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Slide adicionado com sucesso',
        backgroundColor: '#0c3617'
      })
      setManga('')
      setBackground([])
      setTitle([])
    } catch (err) {
      console.log(err)
      showToast({
        id: list.length,
        title: 'Erro',
        descrition: 'erro',
        backgroundColor: '#4f0505'
      })
    }
  }

  return (
    <Panel>
      <Toast toastlist={list} setlist={setList}></Toast>
      <S.Wrapper>
        <S.WrapperContent>
          <form onSubmit={handleSubmit}>
            <S.Title>Capa:</S.Title>
            <FilePond
              files={background}
              onupdatefiles={(files) => {
                const f = files as []
                setBackground(f)
              }}
              allowMultiple={false}
              allowReorder={false}
              allowPaste={true}
              required={false}
              allowImageTransform={true}
              imageResizeTargetWidth={1950}
              imageResizeTargetHeight={600}
              imageResizeUpscale={true}
              imageResizeMode="cover"
              allowFileSizeValidation={true}
              maxFileSize="5mb"
              labelMaxFileSizeExceeded="O arquivo é muito grande"
              labelMaxFileSize="O tamanho maximo é {filesize}"
              labelFileTypeNotAllowed="Formato de arquivo invalido"
              fileValidateTypeLabelExpectedTypes="Esperado {allButLastType} ou {lastType}"
              name="files"
              credits={false}
              acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
              labelIdle='Jogue as imagens em cima de mim ou <span class="filepond--label-action">Procure</span>'
            />
            <S.Title>Titulo:</S.Title>
            <FilePond
              files={title}
              onupdatefiles={(files) => {
                const f = files as []
                setTitle(f)
              }}
              allowMultiple={false}
              allowReorder={false}
              allowPaste={true}
              required={false}
              allowImageTransform={true}
              imageResizeTargetWidth={1950}
              imageResizeTargetHeight={600}
              imageResizeUpscale={true}
              imageResizeMode="cover"
              allowFileSizeValidation={true}
              maxFileSize="5mb"
              labelMaxFileSizeExceeded="O arquivo é muito grande"
              labelMaxFileSize="O tamanho maximo é {filesize}"
              labelFileTypeNotAllowed="Formato de arquivo invalido"
              fileValidateTypeLabelExpectedTypes="Esperado {allButLastType} ou {lastType}"
              name="files"
              credits={false}
              acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
              labelIdle='Jogue as imagens em cima de mim ou <span class="filepond--label-action">Procure</span>'
            />
            <S.Title>Obra:</S.Title>
            <Select
              style={{ width: '100%' }}
              filterOption={false}
              showSearch
              onSearch={(text: string) => {
                setFetching(true)
                if (text != '') {
                  debounce(() => {
                    search.MangaSearch(text).then((mangas) => {
                      setOptions(
                        mangas.data.map((manga) => {
                          return { value: manga.id, label: manga.name }
                        }) as []
                      )
                      setFetching(false)
                    })
                  })
                } else {
                  setFetching(false)
                }
              }}
              onChange={(a: string) => setManga(a)}
              notFoundContent={
                fetching ? (
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                ) : (
                  <Empty
                    description="Nada encontrado"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
              }
              options={options}
            />
            <S.WrapperButton>
              <S.Button>
                <Button fullWidth={true}>Adicionar</Button>
              </S.Button>
            </S.WrapperButton>
          </form>
        </S.WrapperContent>
      </S.Wrapper>
    </Panel>
  )
}

export default CreateCarousel
