/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FilePond, registerPlugin } from 'react-filepond'
import Panel from '../../../templates/panel'
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
import * as S from '../../../styles/panel/manga/mangaCreate.style'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'
import TextArea from '../../../components/TextArea'
import { useEffect, useState } from 'react'
import PanelLoading from '../../../components/PanelLoading'
import { StatusService } from '../../../Services/StatusService'
import { FormatService } from '../../../Services/FormatService'
import { CategoryService } from '../../../Services/CategoryService'
import { PeopleService } from '../../../Services/PeopleService'
import { MangaService } from '../../../Services/MangaService'
import Toast from '../../../components/Toast'
import { ToastI } from '../../../Interfaces/ToastInterface'
import Head from 'next/head'
import { Select } from 'antd'

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

const MangaCreate = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([{ label: '', value: '' }])
  const [peoples, setPeoples] = useState([{ label: '', value: '' }])
  const [status, setStatus] = useState([{ label: '', value: '' }])
  const [formats, setFormats] = useState([{ label: '', value: '' }])
  const [values, setValues] = useState({
    name: '',
    synopsis: '',
    format: '',
    status: '',
    staffs: [],
    categories: []
  })
  const [file, setFile] = useState([])
  const [file2, setFile2] = useState([])
  const [list, setList] = useState([])

  const statusService = new StatusService()
  const formatService = new FormatService()
  const categoryService = new CategoryService()
  const peopleService = new PeopleService()
  const mangaService = new MangaService()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const photo = []

      for (let index = 0; index < file.length; index++) {
        photo.push({
          base:
            'data:' +
            // @ts-ignore
            file[index].fileType +
            ';base64,' +
            // @ts-ignore
            file[index].getFileEncodeBase64String(),
          // @ts-ignore
          name: file[index].filename
        })
      }

      const background = []

      for (let index = 0; index < file2.length; index++) {
        background.push({
          base:
            'data:' +
            // @ts-ignore
            file2[index].fileType +
            ';base64,' +
            // @ts-ignore
            file2[index].getFileEncodeBase64String(),
          // @ts-ignore
          name: file2[index].filename
        })
      }
      await mangaService.createManga(
        values.name,
        values.categories as [],
        values.status,
        values.format,
        values.staffs as [],
        values.synopsis,
        background as [],
        photo as []
      )
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Manga criado com sucesso',
        backgroundColor: '#0c3617'
      })
    } catch (error) {
      console.log(error)
      showToast({
        id: list.length,
        title: 'Erro',
        descrition: 'erro',
        backgroundColor: '#4f0505'
      })
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getInfos = async () => {
    const status2 = await statusService.getAllStatus()
    const categories2 = await categoryService.getAllCategory()
    const peoples2 = await peopleService.getAllPeople()
    const formats2 = await formatService.getAllFormat()
    setCategories(
      categories2.data.map((category) => ({
        label: category.name,
        value: `${category.id}`
      }))
    )
    setPeoples(
      peoples2.data.map((people) => ({
        label: people.name,
        value: `${people.id}`
      }))
    )
    setStatus(
      status2.data.map((status) => ({
        label: status.name,
        value: `${status.id}`
      }))
    )
    setFormats(
      formats2.data.map((format) => ({
        label: format.name,
        value: `${format.id}`
      }))
    )
    setLoading(false)
  }

  useEffect(() => {
    if (loading) {
      getInfos()
    }
  }, [loading, getInfos])

  if (loading) {
    return (
      <Panel openKey={['sub1']} keys="/panel/manga/create">
        <PanelLoading />
      </Panel>
    )
  }

  return (
    <Panel openKey={['sub1']} keys="/panel/manga/create">
      <>
        <Head>
          <title>Tekkadan | Criar Mangá</title>
        </Head>
        <S.Wrapper>
          <Toast toastlist={list} setlist={setList}></Toast>
          <form onSubmit={handleSubmit}>
            <S.WrapperContent>
              <S.Title>Background:</S.Title>
            </S.WrapperContent>
            <S.Files>
              <FilePond
                files={file2}
                onupdatefiles={(files) => {
                  const f = files as []
                  setFile2(f)
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
            </S.Files>
            <S.WrapperContent>
              <S.Title>Capa:</S.Title>
            </S.WrapperContent>
            <S.Files>
              <FilePond
                files={file}
                onupdatefiles={(files) => {
                  const f = files as []
                  setFile(f)
                }}
                allowMultiple={false}
                allowReorder={false}
                allowPaste={true}
                required={false}
                allowImageTransform={true}
                imageResizeTargetWidth={250}
                imageResizeTargetHeight={360}
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
            </S.Files>
            <S.WrapperContent>
              <S.Title>Nome:</S.Title>
              <TextField
                name="name"
                placeholder="Ex: One Piece"
                backgroundColor="contrast2"
                onInputChange={(v) => handleInput('name', v)}
                required
              />
              <S.Title>Sinopse:</S.Title>
              <TextArea
                backgroundColor="contrast2"
                placeholder="Ex: Uma historia sobre um pirata que esticava..."
                onInputChange={(v) => handleInput('synopsis', v)}
              ></TextArea>
              <S.Title>Formato:</S.Title>
              <Select
                showSearch
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={(v) => handleInput('format', v)}
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                {formats.map((format, i) => (
                  <option value={format.value} key={i}>
                    {format.label}
                  </option>
                ))}
              </Select>
              {/* <Select
                onSelectChange={(v) => handleInput('format', v)}
                backgroundColor="contrast2"
                required
              >
                <option value="">Nenhum</option>
                {formats.map((format, i) => (
                  <option value={format.value} key={i}>
                    {format.label}
                  </option>
                ))}
              </Select> */}
              <S.Title>Status:</S.Title>
              <Select
                showSearch
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={(v) => handleInput('status', v)}
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                {status.map((status, i) => (
                  <option value={status.value} key={i}>
                    {status.label}
                  </option>
                ))}
              </Select>
              {/* <Select
                //onSelectChange={(v) => handleInput('status', v)}
                backgroundColor="contrast2"
                required
              >
                <option value="">Nenhum</option>
                {status.map((status, i) => (
                  <option value={status.value} key={i}>
                    {status.label}
                  </option>
                ))}
              </Select> */}
              <S.Title>Generos:</S.Title>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                onChange={(a: string) => handleInput('categories', a)}
                //defaultValue={['a10', 'c12']}
                //onChange={handleChange}
              >
                {categories.map((category, i) => (
                  <option value={category.value} key={i}>
                    {category.label}
                  </option>
                ))}
              </Select>
              {/* <TagPicker
                data={categories}
                onChange={(a: string) => handleInput('categories', a)}
                block
                style={{ borderColor: '#1C1919', borderRadius: 1 }}
              /> */}
              <S.Title>Staff:</S.Title>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                onChange={(a: string) => handleInput('staffs', a)}
                //defaultValue={['a10', 'c12']}
                //onChange={handleChange}
              >
                {peoples.map((people, i) => (
                  <option value={people.value} key={i}>
                    {people.label}
                  </option>
                ))}
              </Select>
              {/* <TagPicker
                data={peoples}
                onChange={(a: string) => handleInput('staffs', a)}
                block
                style={{ borderColor: '#1C1919', borderRadius: 1 }}
              /> */}
            </S.WrapperContent>
            <S.WrapperButton>
              <S.Button>
                <Button fullWidth={true}>Criar</Button>
              </S.Button>
            </S.WrapperButton>
          </form>
        </S.Wrapper>
      </>
    </Panel>
  )
}

export default MangaCreate
