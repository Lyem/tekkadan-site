import Head from 'next/head'
import Button from '../components/Button'
import TextField from '../components/TextField'
import Auth from '../templates/auth'
import * as S from '../styles/sing-in.style'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import * as r from '../utils/api.routes'
import Router from 'next/router'
import Icon from '../components/Icon'

const SingIn = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        r.default.routes.login,
        {
          email: values.email,
          password: values.password
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      localStorage.setItem('user', JSON.stringify(response.data))
      Router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <S.Wrapper>
      <Head>
        <title>Tekkadan | Login</title>
      </Head>
      <Auth title="Logar">
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            placeholder="Email"
            onInputChange={(v) => handleInput('email', v)}
            icon={<Icon icon="icon-message" size={25} />}
            type="email"
          />
          <TextField
            name="password"
            placeholder="Senha"
            onInputChange={(v) => handleInput('password', v)}
            icon={<Icon center={false} icon="icon-lock" size={25} />}
            type="password"
          />
          <Link href="/lost-password">
            <S.ForgotPassword>Esqueceu a senha?</S.ForgotPassword>
          </Link>
          <Button size="large" fullWidth={true}>
            Logar
          </Button>
          <S.FormLink>
            Não tem uma conta?{' '}
            <Link href="/sing-up">
              <a>Aperte aqui</a>
            </Link>
          </S.FormLink>
        </form>
      </Auth>
    </S.Wrapper>
  )
}

export default SingIn
