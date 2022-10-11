import Panel from '../../../templates/panel'
import * as S from '../../../styles/panel/category/categoryCreate.style'
import TextField from '../../../components/TextField'
import Button from '../../../components/Button'
import { useState } from 'react'
import { CategoryService } from '../../../Services/CategoryService'
import { ToastI } from '../../../Interfaces/ToastInterface'
import Toast from '../../../components/Toast'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  const categoryService = new CategoryService()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await categoryService.createCategory(name)
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Categoria criada com sucesso',
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
    <Panel openKey={['sub3', 'sub5']} keys="/panel/category/create">
      <Toast toastlist={list} setlist={setList}></Toast>
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <S.Title>Nome: </S.Title>
          <TextField
            backgroundColor="contrast2"
            placeholder="Ex: Ação"
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

export default CategoryCreate
