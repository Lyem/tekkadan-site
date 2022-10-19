/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Modal, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop-ignore-gif'
import { RcFile } from 'antd/lib/upload'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import TextArea from '../../components/TextArea'
import TextField from '../../components/TextField'
import { UserService } from '../../Services/UserService'
import { getBase64 } from '../../shared/getBase64'
import { RootState } from '../../store'
import Button from '../../components/Button'
import * as S from '../../styles/user/config.style'
import { useRouter } from 'next/router'
import Toast from '../../components/Toast'
import { ToastI } from '../../Interfaces/ToastInterface'
import { setUserInfos } from '../../store/userSlices'
import { image } from '../../shared/api.routes'

function UserConfig() {
  const [photoList, setPhotoList] = useState<UploadFile[]>([])
  const [backgroundList, setBackgroundList] = useState<UploadFile[]>([])
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [about, setAbout] = useState('')
  const [list, setList] = useState([])

  const user = useSelector((state: RootState) => state.user)

  const onChangePhoto: UploadProps['onChange'] = ({
    fileList: newFileList
  }) => {
    setPhotoList(newFileList)
  }
  const onChangeBackground: UploadProps['onChange'] = ({
    fileList: newFileList
  }) => {
    setBackgroundList(newFileList)
  }
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const handleCancel = () => setPreviewOpen(false)

  const onPreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.logged) {
      router.push('/')
    }
    setPhotoList([
      {
        uid: '-1',
        name: 'perfil',
        status: 'done',
        url: `${image + user.data.profile_photo}`
      }
    ])
    setBackgroundList([
      {
        uid: '-1',
        name: 'fundo',
        status: 'done',
        url: `${image + user.data.background_photo}`
      }
    ])
    const name = user.data.name.split('#')
    setName(name[0])
    setTag(name[1])
    setAbout(user.data.about)
  }, [router, user])

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const handleInput = async (event: React.FormEvent) => {
    event.preventDefault()
    const userService = new UserService()
    const background = []
    for (let index = 0; index < backgroundList.length; index++) {
      if (backgroundList[index].name != 'fundo') {
        const base = await getBase64(
          backgroundList[index].originFileObj as RcFile
        )
        background.push({
          base: base,
          name: backgroundList[index].fileName
        })
      }
    }
    const photo = []
    for (let index = 0; index < photoList.length; index++) {
      if (photoList[index].name != 'perfil') {
        const base = await getBase64(photoList[index].originFileObj as RcFile)
        photo.push({
          base: base,
          name: photoList[index].fileName
        })
      }
    }
    let name2 = ''
    let tag2 = ''
    let about2 = ''
    if (user.data.name.split('#')[0] != name) {
      name2 = name
    }
    if (user.data.name.split('#')[1] != tag) {
      tag2 = tag
    }
    if (user.data.about != about) {
      about2 = about
    }
    userService
      .Update(name2, tag2, about2, photo as [], background as [])
      .then((response) => {
        dispatch(setUserInfos(response.data))
        showToast({
          id: list.length,
          title: 'Sucesso',
          descrition: 'Perfil atualizado com sucesso',
          backgroundColor: '#0c3617'
        })
      })
      .catch((error) => {
        showToast({
          id: list.length,
          title: 'Erro',
          descrition: error.response.data.message,
          backgroundColor: '#4f0505'
        })
      })
  }

  return (
    <>
      <Head>
        <title>Tekkadan | Configuração</title>
      </Head>
      <NavBar />
      <Toast toastlist={list} setlist={setList}></Toast>
      <S.Wrapper>
        <S.Title>Fundo:</S.Title>
        {/* @ts-ignore */}
        <ImgCrop
          gifCrop={false}
          modalTitle="Editar imagem:"
          rotate
          aspect={3 / 1}
        >
          <Upload
            listType="picture"
            fileList={backgroundList}
            onChange={onChangeBackground}
            onPreview={onPreview}
          >
            {backgroundList.length < 1 && <Button>Escolha uma imagem</Button>}
          </Upload>
        </ImgCrop>
        <S.Title>Foto:</S.Title>
        {/* @ts-ignore */}
        <ImgCrop gifCrop={false} modalTitle="Editar imagem:" rotate>
          <Upload
            listType="picture"
            fileList={photoList}
            onChange={onChangePhoto}
            onPreview={onPreview}
          >
            {photoList.length < 1 && <Button>Escolha uma imagem</Button>}
          </Upload>
        </ImgCrop>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <form onSubmit={handleInput}>
          <S.Title>Nome:</S.Title>
          <S.WrapperName>
            <TextField
              maxLength={32}
              minLength={2}
              value={name}
              onInputChange={(v) => setName(v)}
              size={90}
              backgroundColor="contrast2"
              placeholder="Nome"
            />
            <S.tag>#</S.tag>
            <TextField
              maxLength={4}
              minLength={4}
              value={tag}
              onInputChange={(v) => {
                if (!isNaN(+v)) {
                  setTag(v)
                }
              }}
              backgroundColor="contrast2"
              placeholder="Tag"
            />
          </S.WrapperName>
          <S.Title>Sobre:</S.Title>
          <TextArea
            onInputChange={(v) => setAbout(v)}
            maxLength={280}
            value={about}
            backgroundColor="contrast2"
          />
          <S.WrapperButton>
            <S.Button>
              <Button>Atualizar</Button>
            </S.Button>
          </S.WrapperButton>
        </form>
      </S.Wrapper>
      <Footer />
    </>
  )
}

export default UserConfig
