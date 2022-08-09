import Panel from '../../../../templates/panel'
import * as S from '../../../../styles/panel/category/categoryCreate.style'
import TextField from '../../../../components/TextField'
import Button from '../../../../components/Button'
import { useEffect, useState } from 'react'
import { ToastI } from '../../../../Interfaces/ToastInterface'
import Toast from '../../../../components/Toast'
import PanelLoading from '../../../../components/PanelLoading'
import { useRouter } from 'next/router'
import { StatusService } from '../../../../Services/StatusService'

const StatusEdit = () => {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const { id } = router.query

  const showToast = (message: ToastI) => {
    setList([...list, message] as never)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statusService = new StatusService()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await statusService.updateStatus(Number(id), name)
      showToast({
        id: list.length,
        title: 'Sucesso',
        descrition: 'Status atualizado com sucesso',
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
      statusService.getStatusById(Number(id)).then((r) => {
        setName(r.data.name)
        setLoading(false)
      })
    }
  }, [statusService, id, loading])

  if (loading) {
    return (
      <Panel>
        <PanelLoading />
      </Panel>
    )
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
              <Button fullWidth={true}>Editar</Button>
            </S.Button>
          </S.WrapperButton>
        </form>
      </S.Wrapper>
    </Panel>
  )
}

export default StatusEdit
