/* eslint-disable @typescript-eslint/ban-ts-comment */
import Panel from '../../../../templates/panel'
import * as S from '../../../../styles/panel/people/peopleCreate.style'
import TextField from '../../../../components/TextField'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import Button from '../../../../components/Button'
import { useEffect, useState } from 'react'
import TextArea from '../../../../components/TextArea'
import { PeopleService } from '../../../../Services/PeopleService'
import Select from '../../../../components/Select'
import Toast from '../../../../components/Toast'
import { ToastI } from '../../../../Interfaces/ToastInterface'
import { useRouter } from 'next/router'
import PanelLoading from '../../../../components/PanelLoading'

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode,
  FilePondPluginFilePoster
)

const PeopleEdit = () => {
  const [file, setFile] = useState([])
  const [file2, setFile2] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  const [values, setValues] = useState({
    name: '',
    twitter: '',
    facebook: '',
    gender: '',
    birth: '',
    about: '',
    instagram: '',
    anilist: '',
    myanimelist: '',
    youtube: '',
    website: ''
  })

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const peopleService = new PeopleService()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
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

      await peopleService.updatePeople(
        Number(id),
        values.name,
        values.birth,
        values.gender,
        photo as [],
        background as [],
        values.about,
        values.twitter,
        values.facebook,
        values.instagram,
        values.anilist,
        values.myanimelist,
        values.youtube,
        values.website
      )
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Pessoa editada com sucesso',
        backgroundColor: '#0c3617'
      })
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

  useEffect(() => {
    if (id && loading) {
      peopleService.getPeopleById(Number(id)).then((r) => {
        handleInput('name', r.data.name)
        if (r.data.birth) {
          handleInput('birth', r.data.birth)
        }
        if (r.data.gender) {
          handleInput('gender', r.data.gender)
        }
        // if (photo) {
        //   handleInput('gender', r.data.gender)
        // }
        // if (background_photo) {
        // }
        if (r.data.about != 'Nada') {
          handleInput('about', r.data.about)
        }
        if (r.data.twitter) {
          handleInput('twitter', r.data.twitter)
        }
        if (r.data.facebook) {
          handleInput('twitter', r.data.facebook)
        }
        if (r.data.instagram) {
          handleInput('twitter', r.data.instagram)
        }
        if (r.data.anilist) {
          handleInput('twitter', r.data.anilist)
        }
        if (r.data.myanimelist) {
          handleInput('myanimelist', r.data.myanimelist)
        }
        if (r.data.youtube) {
          handleInput('youtube', r.data.youtube)
        }
        if (r.data.website) {
          handleInput('website', r.data.website)
        }
        setLoading(false)
      })
    }
  }, [peopleService, id, loading])

  if (loading) {
    return (
      <Panel>
        <PanelLoading />
      </Panel>
    )
  }

  return (
    <Panel>
      <S.Wrapper>
        <Toast toastlist={list} setlist={setList}></Toast>
        <form onSubmit={handleSubmit}>
          <S.Title>Background:</S.Title>
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
            allowFilePoster={true}
          />
          <S.Title>Foto:</S.Title>
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
          <S.Title>Nome:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('name', v)}
            placeholder="Nome"
            backgroundColor="contrast2"
            value={values.name}
            required
          />
          <S.Title>Nacimento:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('birth', v)}
            backgroundColor="contrast2"
            value={values.birth}
            type="date"
          />
          <S.Title>Gênero:</S.Title>
          <Select
            onSelectChange={(v) => handleInput('gender', v)}
            backgroundColor="contrast2"
            value={values.gender}
          >
            <option value="">Desconhecido</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </Select>
          <S.Title>Sobre:</S.Title>
          <TextArea
            onInputChange={(v) => handleInput('about', v)}
            placeholder="EX: Sou um autor pika"
            backgroundColor="contrast2"
            value={values.about}
          />
          <S.Title>Twitter:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('twitter', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.twitter}
          />
          <S.Title>Facebook:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('facebook', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.facebook}
          />
          <S.Title>Instagram:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('instagram', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.instagram}
          />
          <S.Title>Anilist:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('anilist', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.anilist}
          />
          <S.Title>Myanimelist:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('myanimelist', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.myanimelist}
          />
          <S.Title>Youtube:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('youtube', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.youtube}
          />
          <S.Title>Website:</S.Title>
          <TextField
            onInputChange={(v) => handleInput('website', v)}
            placeholder="Link"
            backgroundColor="contrast2"
            value={values.website}
          />
          <S.WrapperButton>
            <S.Button>
              <Button fullWidth={true}>Editar</Button>
            </S.Button>
          </S.WrapperButton>
        </form>
      </S.Wrapper>
    </Panel>
  )
}

export default PeopleEdit
