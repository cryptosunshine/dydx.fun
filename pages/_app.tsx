import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextRouter, useRouter } from 'next/router';
import Head from 'next/head'
import "styles/app.less";
import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as localeTypes from '../locales/types';
import locales from '../locales'
import Layout from '@/components/layout'

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
  ],
  [publicProvider()]
);

const projectId = '9b0bcbf5dbce1022f0816c703811dd1c';

const { wallets } = getDefaultWallets({
  appName: 'dydx.fun',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'dydx.fun',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient()
  const router = useRouter();

  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // 在页面组件加载完成后，设置 loading 状态为 false
  //   setLoading(false);
  // }, []);

  // 多语言配置
  const DefaultLocale = 'en';
  const { locale = DefaultLocale, defaultLocale, pathname }: NextRouter = router;
  const localeCopy: localeTypes.LocaleData = locales[locale];
  const messages = { ...localeCopy[pathname], ...localeCopy['share'] }

  useEffect(() => {
    //读取本地存储的主题
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.classList.add(theme);
    }


    const handleRouteChange = (url: any) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  // 在 loading 为 true 或者当前路由不是根路径时，不显示任何内容
  // if (loading || router.pathname !== '/') return null;


  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="" />
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="/jquery-2.1.1.min.js"></script>
        <script async src="/c2runtime.min.js?v=1.1"></script>
        <script async src="/xyxUtil.js"></script>
      </Head>
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages}
        >
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
        </IntlProvider>
      </QueryClientProvider>
    </>
  )
}

export default App

