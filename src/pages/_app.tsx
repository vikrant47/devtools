import type { AppProps } from 'next/app';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { fontSans, fontMono } from '@/config/fonts';
import { useRouter } from 'next/router';
import '@/styles/globals.scss';
import '@/styles/Theme.scss';
import { ConfigProvider } from 'antd';
import { ThemeEventBus, Themes, ThemeService } from '@/services/system/ui/theme.service';
import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const themeService = ThemeService.instance();
export default function App({ Component, pageProps }: AppProps) {
  const [themeName, setThemeName] = useState<Themes>(Themes.DEFAULT);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeName(themeService.getDefaultThemeName('dark'));
    } else {
      setThemeName(themeService.getDefaultThemeName('light'));
    }
    ThemeEventBus.on('switch.theme', (event, { oldTheme, newTheme }) => {
      setThemeName(newTheme);
      document.body.classList.remove(`theme-${oldTheme}`);
      document.body.classList.add(`theme-${newTheme}`);
    });
  }, []);
  return (
    <ConfigProvider theme={themeService.switchTheme(themeName)}>
      <Component {...pageProps} />;
    </ConfigProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily
};
