import { Link } from '@nextui-org/link';
import { Snippet } from '@nextui-org/snippet';
import { Code } from '@nextui-org/code';
import { button as buttonStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { title, subtitle } from '@/components/primitives';
import { GithubIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import { FeaturedTools } from '@/components/gallery/tool-gallery';
import { getToolsConfigAsArray, ToolsConfig } from '@/config/tools.config';

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
            isExternal
            href={siteConfig.links.docs}
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

        <div className="mt-8">
          <FeaturedTools tools={getToolsConfigAsArray()} />
        </div>
      </section>
    </DefaultLayout>
  );
}
