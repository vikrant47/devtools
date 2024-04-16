import { Input, Button, Divider, Snippet, Tabs, Tab, Textarea } from '@nextui-org/react';
import DefaultLayout from '@/layouts/default';
import ToolHeader from '@/components/tool-header';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import { InputWithAction } from '@/components/generators/input-with-action';
export const URLEncoderConfig: ToolDefinition = {
  title: 'URL Encoder',
  description: 'Encode URLs to make them more friendly for search engines.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/url/url-encoder',
  active: true,
  featured: true
};
export default function URLEncoder() {
  const [url, setUrl] = useState('');
  const [encodedUrl, setEncodedUrl] = useState('');

  const handleEncode = () => {
    const encoded = encodeURIComponent(url);
    setEncodedUrl(encoded);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={URLEncoderConfig} />
        <div className="tools-container w-full">
          <InputWithAction
            className="flex flex-col gap-4"
            placeholder="Enter URL to encode"
            value={url}
            onChange={setUrl}
            onAction={handleEncode}
            actionText="Encode"
            inputType="textarea"
            showSnippet={true}
            snippetValue={encodedUrl}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
