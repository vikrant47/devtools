import { Input, Button, Divider, Snippet, Tabs, Tab, Textarea } from '@nextui-org/react';
import DefaultLayout from '@/layouts/default';
import ToolHeader from '@/components/tool-header';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import { InputWithAction } from '@/components/generators/input-with-action';
export const URLDecoderConfig: ToolDefinition = {
  title: 'URL Decoder',
  description: 'Decode URLs to make them more friendly for search engines.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/url/url-decoder',
  active: true,
  featured: true
};
export default function URLDecoder() {
  const [url, setUrl] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');

  const handleDecode = () => {
    const decoded = decodeURIComponent(url);
    setDecodedUrl(decoded);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={URLDecoderConfig} />
        <div className="tools-container w-full">
          <InputWithAction
            className="flex flex-col gap-4"
            placeholder="Enter URL to decode"
            value={url}
            onChange={setUrl}
            onAction={handleDecode}
            actionText="Decode"
            inputType="textarea"
            showSnippet={true}
            snippetValue={decodedUrl}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
