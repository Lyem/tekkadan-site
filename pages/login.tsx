import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Auth from '../templates/auth';

const Login: GetStaticProps = () => {
    return (
        <div>
            <Head>
                <title>Tekkadan | Login</title>
            </Head>
            <Auth />
        </div>
    )
}

export default Login