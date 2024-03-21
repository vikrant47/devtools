'use client';

import { CustomRadio } from '@/components/custom-radio';
import DefaultLayout from '@/layouts/default';
import { RadioGroup, Radio, Button, Code } from '@nextui-org/react';
import { title, subtitle } from '@/components/primitives';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import ToolHeader from '@/components/tool-header';
export const UUIDConfig: ToolDefinition = {
  title: 'UUID Generator',
  description: 'Generate UUIDs with different versions.',
  image: 'https://via.placeholder.com/150',
  href: '/tools/dev/generators/uuid-generator'
};
export default function UUIdGenerator() {
  const defaultChecked = 4;
  const [selectedVersion, setSelectedVersion] = useState(defaultChecked);
  const [uuidString, setUuidString] = useState('');
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={UUIDConfig} />
        <div className="tools-container">
          <RadioGroup
            label=""
            orientation="horizontal"
            onChange={(e) => {
              setSelectedVersion(parseInt(e.target.value));
            }}>
            {[...Array(7)].map((val, i) => (
              <Radio key={i} value={i + ''} checked={i === selectedVersion}>
                Version {i}
              </Radio>
            ))}
          </RadioGroup>
          <div className="flex flex-col gap-4">
            <Button
              color="primary"
              onClick={() => {
                const uuid = require('uuid');
                setUuidString(uuid['v' + selectedVersion]());
              }}>
              Generate
            </Button>
            <div className="flex flex-col items-center justify-center gap-4">
              <Code>{uuidString}</Code>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
