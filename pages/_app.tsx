import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import React, { useState, useEffect } from 'react';
import Loading from './loading';
import Router from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    if(!localStorage.getItem('user')){
      Router.push('/login')
    }
    setTimeout(() => {
      setLoading(true)
    }, 3500);
  })

  return <>
    <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    </Head>
    {loading ? (
    <Component {...pageProps} />):(
      <Loading />
    )}
  </>
}

export default MyApp
