import { Button, Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import { Head } from './head';
import { Navbar } from '@/components/common/navbar';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="relative">
      <Head />
      <Navbar />
      <Content className="container mx-auto px-6 flex-grow grid grid-cols-12 gap-1">
        <div className="left-add-area col-span-1"></div>
        <div className="main-area col-span-10">{children}</div>
        <div className="right-add-area col-span-1"></div>
      </Content>
      <Footer className="w-full flex items-center justify-center py-3">
        <Link
          passHref
          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
          title="nextui.org homepage">
          <Button type="link" className="flex items-center gap-1 text-primary">
            <span className="text-default-600">Powered by</span>
            <Text strong>NextUI</Text>
          </Button>
        </Link>
      </Footer>
    </Layout>
  );
}
