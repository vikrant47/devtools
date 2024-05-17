import { Layout, Typography, Tabs } from 'antd';
import ToolHeader from '@/components/tool-header';
import { getToolsConfigAsArray, ToolsConfig } from '@/config/tools.config';
import DefaultLayout from '@/layouts/default';
import { Tools } from '@/types/tool.definition';
import { ToolGallery } from '@/components/devtools/gallery/tool-gallery';
import React from 'react';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

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
          <Title level={1}>All Tools &nbsp;</Title>
          <Text className="mt-4">
            unleash your creativity with our comprehensive collection of digital utilities.
          </Text>
        </div>
        <Tabs className="">
          {allTools.categories.map((category, i) => (
            <TabPane key={i} tab={category.name}>
              <div className="tool-subcat-wrapper">
                {category.subCategories.map((subCategory, j) => (
                  <div key={j}>
                    <Title level={3}>{subCategory.name}</Title>
                    <ToolGallery tools={subCategory.tools} />
                  </div>
                ))}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </section>
    </DefaultLayout>
  );
}
