import { CustomRadio } from '@/components/custom-radio';
import DefaultLayout from '@/layouts/default';
import { RadioGroup, Radio, Button, Divider, Snippet, Input, Tabs, Tab } from '@nextui-org/react';
import { title, subtitle } from '@/components/primitives';
import { use, useEffect, useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import ToolHeader from '@/components/tool-header';
import { NIL, parse, stringify, v1, v3, v4, v5, validate, version } from 'uuid';
import { BulkValueGenerator } from '@/components/generators/bluk-generator';
import { useDebounce } from '@/hooks/useDebounce';

export const UUIDConfig: ToolDefinition = {
  title: 'UUID Generator',
  description: 'Generate UUIDs with different versions.',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/generators/uuid-generator',
  active: true,
  featured: true
};

export default function UUIdGenerator() {
  const [selectedVersion, setSelectedVersion] = useState('4');
  const [uuidStrings, setUuidStrings] = useState<string[]>([]);
  const [parsedUuid, setParsedUuid] = useState('');
  const [parsedString, setParsedString] = useState('');
  const [count, setCount] = useState(1);
  const [generateCount, setGenerateCount] = useState(1);
  const onChangeDebounce = useDebounce(1000);
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

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={UUIDConfig} />
        <div className="tools-container">
          <Tabs className="w-full" aria-label="Generate UUID's">
            <Tab title="UUID Generator">
              <Divider className="my-4" />
              <div className="generator-header flex flex-row gap-4 w-full pb-2">
                <RadioGroup
                  className="py-2"
                  defaultValue={selectedVersion}
                  label=""
                  orientation="horizontal"
                  onChange={(e) => {
                    const version = e.target.value;
                    setSelectedVersion(version);
                  }}>
                  {['nil', 1, 4].map((val, i) => (
                    <Radio key={i} value={val + ''} checked={val == selectedVersion}>
                      {val === 'nil' ? 'Nil' : `Version ${val}`}
                    </Radio>
                  ))}
                </RadioGroup>

                <Input
                  type="number"
                  min={1}
                  max={1000}
                  className="w-20 p-0"
                  value={count + ''}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setGenerateCount(() => generateCount + 1);
                    }
                  }}
                  onChange={(e) => {
                    setCount(parseInt(e.target.value));
                  }}
                />
              </div>
              <Button
                className="w-full pb-2"
                color="primary"
                onClick={() => {
                  setGenerateCount(() => generateCount + 1);
                }}>
                Generate
              </Button>

              <div className="flex flex-col pt-2">
                <Snippet symbol="#" variant="bordered">
                  {uuidStrings}
                </Snippet>
              </div>
            </Tab>
            <Tab title="UUID Parser">
              <Divider className="my-4" />
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Enter UUID to parse"
                  value={parsedString}
                  onChange={(e) => setParsedString(e.target.value)}
                />
                <Button color="secondary" onClick={handleParse}>
                  Parse
                </Button>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Snippet symbol="#" variant="bordered">
                    {parsedUuid}
                  </Snippet>
                </div>
              </div>
            </Tab>
            <Tab title="UUID Stringifier">
              <Divider className="my-4" />
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Enter parsed UUID to stringify"
                  value={parsedUuid}
                  onChange={(e) => setParsedUuid(e.target.value)}
                />
                <Button color="secondary" onClick={handleStringify}>
                  Stringify
                </Button>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Snippet symbol="#" variant="bordered">
                    {parsedString}
                  </Snippet>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}
