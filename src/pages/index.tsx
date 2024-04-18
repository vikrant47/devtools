import { Button, Tabs } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { ToolGallery } from '@/components/devtools/gallery/tool-gallery';
import { getToolsConfigAsArray, ToolsConfig } from '@/config/tools.config';

export default function IndexPage() {
  const tabItems = [
    { title: 'Featured Tools', subtitle: '', filter: { featured: true, active: true } },
    {
      title: 'Dev Tools',
      subtitle: '',
      filter: { category: 'Development', active: true }
    },
    {
      title: 'Design Tools',
      subtitle: '',
      filter: { category: 'Development', active: true }
    },
    {
      title: 'Utility Tools',
      subtitle: '',
      filter: { category: 'Development', active: true }
    }
  ].map((toolFilter, i) => ({
    ...toolFilter,
    children: (
      <div key={i} className="py-5">
        <div className="">
          <div className="space-y-1">
            <p className="text-small text-default-400">{toolFilter.subtitle}</p>
          </div>

          <div className="">
            <ToolGallery tools={getToolsConfigAsArray(toolFilter.filter)} />
          </div>
        </div>
      </div>
    )
  }));

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Empowering Your &nbsp;</h1>
          <h1 className={title({ color: 'violet' })}>Online Experience:&nbsp;</h1>
          <br />
          <h1 className={title()}>with Our Comprehensive Suite of Digital Tools!.</h1>
          <h4 className={subtitle({ class: 'mt-4' })}>
            unleash your creativity with our comprehensive collection of digital utilities.
          </h4>
        </div>

        <div className="flex gap-3">
          <Link href="/tools">
            <Button
              className="text-sm font-normal text-default-600 bg-default-100"
              shape="round"
              type="primary"
              ghost>
              View All Tools
            </Button>
          </Link>
          {/* <Link
            isExternal
            className={buttonStyles({ variant: 'bordered', radius: 'full' })}
            href={siteConfig.links.github}>
            <GithubIcon size={20} />
            GitHub
          </Link> */}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Tabs className="" defaultActiveKey="0">
            {tabItems.map((item, index) => (
              <Tabs.TabPane tab={item.title} key={index}>
                {item.children}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
