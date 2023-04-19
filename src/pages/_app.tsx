import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My CV</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
