import type { AppProps } from 'next/app';
import Head from 'next/head';

import { name, position } from '@/resume';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          {name} — {position}
        </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
