import getConfig from 'next/config';
import BaseDocument, { Head, Html, Main, NextScript } from 'next/document';

const { publicRuntimeConfig } = getConfig();

export default class Document extends BaseDocument {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="description" content={publicRuntimeConfig.appName} />
          <meta name="author" content={publicRuntimeConfig.author} />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#212529" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
