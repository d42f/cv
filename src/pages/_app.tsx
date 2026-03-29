import type { AppProps } from 'next/app';
import Head from 'next/head';

import { name } from '@/resume';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{name} CV</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
