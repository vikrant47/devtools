import { Button, Input, Radio, Tabs } from 'antd';
import { useState, useEffect } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import ToolHeader from '@/components/tool-header';
import DefaultLayout from '@/layouts/default';
import { NIL, parse, stringify, v1, v3, v4, v5 } from 'uuid';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CodeSnippet } from '@/components/system/utils/code.snippet';

export const UUIDConfig: ToolDefinition = {
  title: 'UUID Generator',
  description: 'Generate UUIDs with different versions.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/generators/uuid-generator',
  active: true,
  featured: true
};

const UUIdGenerator = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('4');
  const [uuidStrings, setUuidStrings] = useState<string[]>([]);
  const [parsedUuid, setParsedUuid] = useState<string>('');
  const [parsedString, setParsedString] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [generateCount, setGenerateCount] = useState<number>(1);

  const generateUUID = (version: string): string => {
    let uuidValue;
    switch (version) {
      case 'nil':
        uuidValue = NIL;
        break;
      case '1':
        uuidValue = v1();
        break;
      case '3':
        uuidValue = v3();
        break;
      case '4':
        uuidValue = v4();
        break;
      case '5':
        uuidValue = v5();
        break;
      default:
        uuidValue = '';
        break;
    }
    return uuidValue;
  };

  const handleParse = () => {
    const parsedUuid = parse(parsedString);
    setParsedUuid(parsedUuid);
  };

  const handleStringify = () => {
    const parsedString = stringify(parsedUuid);
    setParsedString(parsedString);
  };

  useEffect(() => {
    const newUuidStrings = [];
    for (let i = 0; i < count; i++) {
      newUuidStrings.push(generateUUID(selectedVersion));
    }
    setUuidStrings(newUuidStrings);
  }, [selectedVersion, generateCount]);

  const tabsItems = [
    {
      key: 'generator',
      label: 'UUID Generator',
      children: (
        <div>
          <div className="generator-header flex flex-row gap-4 w-full pb-2">
            <Radio.Group
              className="py-2"
              defaultValue={selectedVersion}
              onChange={(e: RadioChangeEvent) => {
                const version = e.target.value;
                setSelectedVersion(version);
              }}>
              {['nil', '1', '4'].map((val, i) => (
                <Radio key={i} value={val}>
                  {val === 'nil' ? 'Nil' : `Version ${val}`}
                </Radio>
              ))}
            </Radio.Group>

            <Input
              type="number"
              min={1}
              max={1000}
              className="w-20 p-0"
              value={count}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setGenerateCount(generateCount + 1);
                }
              }}
              onChange={(e) => {
                setCount(parseInt(e.target.value));
              }}
            />
            <Button
              className={'pb-2'}
              type="primary"
              onClick={() => setGenerateCount(generateCount + 1)}>
              Generate
            </Button>
          </div>

          <div className="flex flex-col pt-2">
            <CodeSnippet code={uuidStrings.join('\n')}></CodeSnippet>
          </div>
        </div>
      )
    },
    {
      key: 'parser',
      label: 'UUID Parser',
      children: (
        <div>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter UUID to parse"
              value={parsedString}
              onChange={(e) => {
                setParsedString(e.target.value);
              }}
            />
            <Button type="default" onClick={handleParse}>
              Parse
            </Button>
            <div className="flex flex-col items-center justify-center gap-4">
              <CodeSnippet code={parsedString}></CodeSnippet>
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'stringifier',
      label: 'UUID Stringifier',
      children: (
        <div>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter parsed UUID to stringify"
              value={parsedUuid}
              onChange={(e) => setParsedUuid(e.target.value)}
            />
            <Button type="default" onClick={handleStringify}>
              Stringify
            </Button>
            <div className="flex flex-col items-center justify-center gap-4">
              <CodeSnippet code={parsedString}></CodeSnippet>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={UUIDConfig} />
        <div className="tools-container w-full">
          <Tabs defaultActiveKey={tabsItems[0].key} items={tabsItems}></Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default UUIdGenerator;
