import getConfig from 'next/config';
import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

const { publicRuntimeConfig } = getConfig();

interface DocumentAdditionalProps {
  languageDirection: string;
  language: string;
  appName: string;
  author: string;
}

type DocumentProps = DocumentInitialProps & DocumentAdditionalProps;

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const originalRenderPage = context.renderPage;

    // Run the React rendering logic synchronously
    context.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: App => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: Component => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(context);

    const additionalProps = {
      languageDirection: 'ltr',
      language: 'en',
      appName: publicRuntimeConfig.appName,
      author: publicRuntimeConfig.author,
    };

    return { ...initialProps, ...additionalProps };
  }

  render() {
    const { appName, author, language, languageDirection } = this.props;

    return (
      <Html lang={language} dir={languageDirection}>
        <Head>
          <meta name="description" content={appName} />
          <meta name="author" content={author} />
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
