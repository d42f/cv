import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();

import '@/styles/globals.scss';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.appName}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
