import type { AppProps } from 'next/app';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { fontSans, fontMono } from '@/config/fonts';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return <Component {...pageProps} />;
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily
};
