import Head from 'next/head'
import Layout from '../components/layout';
import { AppProps } from 'next/app';
import '../styles/globals.css'
import 'github-markdown-css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Bumble的博客 - Bumble</title>
      <meta name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}
