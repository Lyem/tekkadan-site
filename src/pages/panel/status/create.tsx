import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/category/categoryCreate.style'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'
import { useState } from 'react'
import { ToastI } from '../../../Interfaces/ToastInterface'
import Toast from '../../../components/Toast'
import { StatusService } from '../../../Services/StatusService'

const StatusCreate = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const statusService = new StatusService()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await statusService.createStatus(name)
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Status criado com sucesso',
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
    <Panel>
      <Toast toastlist={list} setlist={setList}></Toast>
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <S.Title>Nome: </S.Title>
          <TextField
            backgroundColor="contrast2"
            placeholder="Ex: Hiato"
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

export default StatusCreate
