import * as S from '../styles/sing-up.style'
import Head from 'next/head'
import Button from '../components/Button'
import TextField from '../components/TextField'
import Auth from '../templates/auth'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import * as r from '../utils/api.routes'
import Router from 'next/router'
import Icon from '../components/Icon'

const SingUp = () => {
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
      const response = await axios.post(
        r.default.routes.createUser,
        {
          name: values.name,
          email: values.email,
          password: values.password
        },
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
      console.log(response.data)
      //localStorage.setItem('user', JSON.stringify(response.data))
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
          />
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
          <TextField
            placeholder="Confirmar senha"
            onInputChange={(v) => handleInput('confirmpass', v)}
            icon={<Icon center={false} icon="icon-lock" size={25} />}
            type="password"
          />
          <Button size="large" fullWidth={true}>
            Criar conta
          </Button>
        </form>
        <S.FormLink>
          Já tem uma conta?{' '}
          <Link href="/sing-in">
            <a>Aperte aqui</a>
          </Link>
        </S.FormLink>
      </Auth>
    </S.Wrapper>
  )
}

export default SingUp
