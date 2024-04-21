import { Input, Button, Divider, Tabs, Textarea } from 'antd';
import DefaultLayout from '@/layouts/default';
import ToolHeader from '@/components/tool-header';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import { InputWithAction } from '@/components/devtools/generators/input-with-action';

const { TabPane } = Tabs;

export const URLEncoderConfig: ToolDefinition = {
  title: 'URL Encoder',
  description: 'Encode URLs to make them more friendly for search engines.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/url/url-encoder',
  active: true,
  featured: true
};

const URLEncoder = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={URLEncoderConfig} />
        <div className="tools-container w-full">
          <InputWithAction
            className="flex flex-col gap-4"
            placeholder="Enter URL to encode"
            value=""
            applyOnChange={true}
            //  onChange={(e) => setUrl(e.target.value)}
            onAction={(value: string) => {
              return encodeURIComponent(value).trim();
            }}
            actionText="Encode"
            inputType="textarea"
            showSnippet={true}
            validator={(rule: any, value: string) => {
              return new Promise((resolve, reject) => {
                if (value && value.length > 0) {
                  try {
                    new URL(value);
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
  );
};

export default URLEncoder;
