import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { ToastI } from '../../Interfaces/ToastInterface'
import * as S from './style'

export type ToastProps = {
  toastlist: ToastI[]
  setlist: Dispatch<SetStateAction<never[]>>
}

const Toast = ({ toastlist, setlist }: ToastProps) => {
  const deleteToast = useCallback(
    (id: number) => {
      const toastListItem = toastlist.filter((e) => e.id !== id)
      console.log(id)
      setlist(toastListItem as never)
    },
    [toastlist, setlist]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id)
      }
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [toastlist, deleteToast])
  return (
    <S.Wrapper>
      {toastlist.map((toast, i) => (
        <S.WrapperToast
          key={i}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <S.Exit
            onClick={() => {
              deleteToast(toast.id)
            }}
          >
            X
          </S.Exit>
          <S.WrapperInfos>
            <S.Title>{toast.title}</S.Title>
            <S.Description>{toast.descrition}</S.Description>
          </S.WrapperInfos>
        </S.WrapperToast>
      ))}
    </S.Wrapper>
  )
}

export default Toast
