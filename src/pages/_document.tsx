import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <AntdRegistry>
          <Main />
          <NextScript />
        </AntdRegistry>
      </body>
    </Html>
  );
}
