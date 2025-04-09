import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import "styles/app.less";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as localeTypes from "../locales/types";
import locales from "../locales";
import Layout from "@/components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();
  const router = useRouter();
  const [isScriptsLoaded, setIsScriptsLoaded] = useState(false);

  useEffect(() => {
    // 添加一个标记，防止重复加载
    if (window._scriptsLoaded) {
      setIsScriptsLoaded(true);
      return;
    }

    const requiredScripts = [
      '/jquery-2.1.1.min.js',
      '/c2runtime.min.js?v=1.1',
      '/xyxUtil.js'
    ];

    let loadedCount = 0;
    const scriptElements: HTMLScriptElement[] = [];

    const handleScriptLoad = () => {
      loadedCount++;
      if (loadedCount === requiredScripts.length) {
        window._scriptsLoaded = true; // 设置全局标记
        setIsScriptsLoaded(true);
      }
    };

    const handleScriptError = (scriptSrc: string) => {
      console.error(`Failed to load script: ${scriptSrc}`);
      // 可以在这里添加重试逻辑或错误提示
    };

    // 创建并加载脚本
    requiredScripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = handleScriptLoad;
      script.onerror = () => handleScriptError(src);
      scriptElements.push(script);
      document.body.appendChild(script);
    });

    // 清理函数
    return () => {
      scriptElements.forEach(script => {
        document.body.removeChild(script);
      });
    };
  }, []);

  // 多语言配置
  const DefaultLocale = "en";
  const {
    locale = DefaultLocale,
    defaultLocale,
    pathname,
  }: NextRouter = router;
  const localeCopy: localeTypes.LocaleData = locales[locale];
  const messages = { ...localeCopy[pathname], ...localeCopy["share"] };

  useEffect(() => {
    //读取本地存储的主题
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.classList.add(theme);
    }

    const handleRouteChange = (url: any) => {
      if (window.gtag) {
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        });
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Block Hero</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="BlockHero" />
        <meta name="keywords" content="BlockHero" />
        <meta name="description" content="BlockHero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale={locale}
          defaultLocale={defaultLocale}
          messages={messages}
        >
          <Layout>
            {isScriptsLoaded ? (
              <Component {...pageProps} />
            ) : (
              <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#13131c',
                color: '#fff'
              }}>
                <div style={{
                  textAlign: 'center'
                }}>
                  <div className="loading-spinner"></div>
                  <div style={{ marginTop: '20px' }}>Loading resources...</div>
                </div>
              </div>
            )}
          </Layout>
        </IntlProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
