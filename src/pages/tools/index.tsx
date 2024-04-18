import { ToolGallery } from '@/components/gallery/tool-gallery';
import { subtitle, title } from '@/components/primitives';
import ToolHeader from '@/components/tool-header';
import { getToolsConfigAsArray, ToolsConfig } from '@/config/tools.config';
import DefaultLayout from '@/layouts/default';
import { Tools } from '@/types/tool.definition';
import { Tab, Tabs } from '@nextui-org/react';

export default function AllTools() {
  const allTools: Tools = JSON.parse(JSON.stringify(ToolsConfig));
  allTools.categories.unshift({
    name: 'All',
    subCategories: [
      {
        name: '',
        tools: getToolsConfigAsArray({})
      }
    ]
  });
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-2 py-2 md:py-2">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>All Tools &nbsp;</h1>
          <h4 className={subtitle({ class: 'mt-4' })}>
            unleash your creativity with our comprehensive collection of digital utilities.
          </h4>
        </div>
        <Tabs className="">
          {allTools.categories.map((category, i) => (
            <Tab key={i} title={category.name}>
              <div className="tool-subcat-wrapper">
                {category.subCategories.map((subCategory, j) => (
                  <div key={j}>
                    <h3 className={subtitle()}>{subCategory.name}</h3>
                    <ToolGallery tools={subCategory.tools} />
                  </div>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </section>
    </DefaultLayout>
  );
}
