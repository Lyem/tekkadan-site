import * as S from '../styles/sign-up.style'
import Head from 'next/head'
import Button from '../components/Button'
import TextField from '../components/TextField'
import Auth from '../templates/auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Icon from '../components/Icon'
import { UserService } from '../Services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { login, setUserInfos } from '../store/userSlices'
import { RootState } from '../store'

const userService = new UserService()

const SingUp = () => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user)

  const router = useRouter()

  useEffect(() => {
    if (user.logged) {
      router.push('/')
    }
  }, [router, user.logged])

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmpass: ''
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await userService.Register(
        values.name,
        values.email,
        values.password
      )
      dispatch(setUserInfos(response.data))
      dispatch(login())
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.Wrapper>
      <Head>
        <title>Tekkadan | Criar conta</title>
      </Head>
      <Auth title="Criar conta">
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            placeholder="Nome"
            onInputChange={(v) => handleInput('name', v)}
            icon={<Icon icon="icon-account" size={25} />}
            required
          />
          <TextField
            name="email"
            placeholder="Email"
            onInputChange={(v) => handleInput('email', v)}
            icon={<Icon icon="icon-message" size={25} />}
            type="email"
            required
          />
          <TextField
            name="password"
            placeholder="Senha"
            onInputChange={(v) => handleInput('password', v)}
            icon={<Icon center={false} icon="icon-lock" size={25} />}
            type="password"
            required
          />
          <TextField
            placeholder="Confirmar senha"
            onInputChange={(v) => handleInput('confirmpass', v)}
            icon={<Icon center={false} icon="icon-lock" size={25} />}
            type="password"
            required
          />
          <Button size="large" fullWidth={true}>
            Criar conta
          </Button>
        </form>
        <S.FormLink>
          Já tem uma conta?{' '}
          <Link href="/sign-in">
            <a>Aperte aqui</a>
          </Link>
        </S.FormLink>
      </Auth>
    </S.Wrapper>
  )
}

export default SingUp
