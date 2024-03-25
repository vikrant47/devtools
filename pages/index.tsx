import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import { ToolGallery } from '@/components/gallery/tool-gallery';
import { getToolsConfigAsArray, ToolsConfig } from '@/config/tools.config';
import { Divider } from '@nextui-org/divider';
import { Tab, Tabs } from '@nextui-org/react';

export default function IndexPage() {
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
          <Link
            href="/tools"
            className={buttonStyles({
              color: 'primary',
              radius: 'full',
              variant: 'shadow'
            })}>
            View All Tools
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
          <Tabs className="">
            {[
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
            ].map((toolFilter, i) => (
              <Tab key={i} title={toolFilter.title}>
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
              </Tab>
            ))}
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
