import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ThemeProvider } from 'next-themes';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <AntdRegistry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Main />
            <NextScript />
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </Html>
  );
}
