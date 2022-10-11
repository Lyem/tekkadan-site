import Head from 'next/head'
import type { AppProps } from 'next/app'
import GlobalStyles from '../styles/global'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import '../styles/ant.css'
import NextNProgress from 'nextjs-progressbar'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useEffect, useState } from 'react'
import { UserService } from '../Services/UserService'
import { login, setUserInfos } from '../store/userSlices'
import Loading from '../components/loading'

const userService = new UserService()

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    userService
      .Me()
      .then((response) => {
        if (response.status == 200) {
          store.dispatch(setUserInfos(response.data))
          store.dispatch(login())
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

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
      <NextNProgress
        color="#B61D1D"
        startPosition={0.8}
        stopDelayMs={0}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <Provider store={store}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </Provider>
    </ThemeProvider>
  )
}

export default MyApp
