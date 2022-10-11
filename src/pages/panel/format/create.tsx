import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/category/categoryCreate.style'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'
import { useState } from 'react'
import { ToastI } from '../../../Interfaces/ToastInterface'
import Toast from '../../../components/Toast'
import { FormatService } from '../../../Services/FormatService'

const FormatCreate = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const formatService = new FormatService()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await formatService.createFormat(name)
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Formato criado com sucesso',
        backgroundColor: '#0c3617'
      })
      setName('')
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
    <Panel openKey={['sub3', 'sub6']} keys="/panel/format/create">
      <Toast toastlist={list} setlist={setList}></Toast>
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <S.Title>Nome: </S.Title>
          <TextField
            backgroundColor="contrast2"
            placeholder="Ex: Mangá"
            onInputChange={(v) => setName(v)}
            value={name}
            required
          />
          <S.WrapperButton>
            <S.Button>
              <Button fullWidth={true}>Criar</Button>
            </S.Button>
          </S.WrapperButton>
        </form>
      </S.Wrapper>
    </Panel>
  )
}

export default FormatCreate
