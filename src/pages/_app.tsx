import Head from 'next/head'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react'
import Loading from '../components/loading'
import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import axios from 'axios'
import * as r from '../utils/api.routes'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [values, setValues] = useState({
    token: ''
  })

  const updateUser = async () => {
    if (update) {
      try {
        setUpdate(false)
        const response = await axios.get(r.default.routes.getUserByToken, {
          headers: {
            Authorization: 'Bearer ' + values.token
          }
        })
        const a = response.data
        a.token = values.token
        localStorage.setItem('user', JSON.stringify(a))
      } catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    if (!loading) {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user')!)
        setValues({ token: user.token })
        setUpdate(true)
      }
    }
    setTimeout(() => {
      setLoading(true)
    }, 3500)
  }, [loading])

  updateUser()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
