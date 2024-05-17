import { Input, Button, Divider, Tabs, Textarea } from 'antd';
import DefaultLayout from '@/layouts/default';
import ToolHeader from '@/components/tool-header';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import { InputWithAction } from '@/components/devtools/generators/input-with-action';
import { ToolContext } from '@/contexts/tool-context';

const { TabPane } = Tabs;

export const URLDecoderConfig: ToolDefinition = {
  title: 'URL Decoder',
  description: 'Decode URLs to make them more friendly for search engines.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/url/url-decoder',
  active: true,
  featured: true
};

const URLDecoder = () => {
  return (
    <ToolContext.Provider value={URLDecoderConfig}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <ToolHeader />
          <div className="tools-container w-full">
            <InputWithAction
              className="flex flex-col gap-4"
              placeholder="Enter URL to decode"
              value=""
              applyOnChange={true}
              //  onChange={(e) => setUrl(e.target.value)}
              onAction={(value: string) => {
                return decodeURIComponent(value).trim();
              }}
              actionText="Decode"
              inputType="textarea"
              showSnippet={true}
              validator={(rule: any, value: string) => {
                return new Promise((resolve, reject) => {
                  if (value && value.length > 0) {
                    try {
                      const decoded = decodeURIComponent(value);
                      new URL(decoded);
                      resolve(true);
                    } catch (e) {
                      reject('Invalid URL!');
                    }
                  } else {
                    reject('Invalid URL!');
                  }
                });
              }}
            />
          </div>
        </section>
      </DefaultLayout>
    </ToolContext.Provider>
  );
};

export default URLDecoder;
