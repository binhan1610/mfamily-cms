import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
// import nextI18nConfig from '../next-i18next.config';
import { memoize } from 'src/utils/common';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { RecoilRoot } from 'recoil';
import Head from 'next/head';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import AppLayout from '../src/layout/AppLayout';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='M-Family' />
        <meta name='description' content='M-Family' />
        <link rel='icon' type='image/png' href='/static/images/avatar.jpg' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no'
        />
        <title>M-Family</title>
      </Head>
      <RecoilRoot>
        <ToastContainer
          position='top-right'
          style={{ fontSize: 16, zIndex: 10000 }}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          transition={Slide}
        />
        <ErrorBoundary>
          <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  );
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console: any) => ({
  ...console,
  warn: (...args: any) => (args[0].includes('Duplicate atom key') ? null : console.warn(...args)),
}));
global.console = mutedConsole(global.console);

export default appWithTranslation(MyApp);
