import { Modal, Upload, UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { RcFile } from 'antd/lib/upload'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import { UserService } from '../../Services/UserService'
import { getBase64 } from '../../shared/getBase64'
import * as S from '../../styles/user/config.style'

function UserConfig() {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
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

  useEffect(() => {
    const userService = new UserService()
    userService.Me().then((response) => {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: `${response.data.profile_photo}`
        }
      ])
    })
  }, [])

  return (
    <>
      <NavBar />
      <S.Wrapper>
        <S.Title>Foto:</S.Title>
        <ImgCrop rotate>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 1 && 'Upload'}
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
      </S.Wrapper>
      <Footer />
    </>
  )
}

export default UserConfig
