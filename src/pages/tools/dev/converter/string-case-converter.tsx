import ToolHeader from '@/components/tool-header';
import { ToolContext } from '@/contexts/tool-context';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import React, { useState, ChangeEvent } from 'react';
import {Input, Select} from 'antd';

const { TextArea } = Input;
enum StringCaseEnum {
    upperCase= 'uppercase',
    lowerCase= 'lowercase',
    capitalize= 'capitalize',
}

export const StringCaseConverterConfig: ToolDefinition = {
  title: 'String Case Converter',
  description: 'Convert string to uppercase, lowercase, or capitalize',
  image: '/icons/tools/dev/converter/string-case-converter.png',
  href: '/tools/dev/converter/string-case-converter',
  active: true,
  featured: true
}

const StringCaseConverter: React.FC = () => {
  const [input, setInput] = useState<string>("Enter your text here");
  const [output, setOutput] = useState<string>('');
  const [conversionType, setConversionType] = useState<string>(StringCaseEnum.upperCase);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setConversionType(value);
    convertString(value);
  };

  const convertString = (conversionType:string): void => {
    let result: string;
    switch (conversionType) {
      case 'uppercase':
        result = input.toUpperCase();
        break;
      case 'lowercase':
        result = input.toLowerCase();
        break;
      case 'capitalize':
        result = input
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      default:
        result = input;
    }
    setOutput(result);
  };

  return (
    <ToolContext.Provider value={StringCaseConverterConfig}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <ToolHeader />
    <div>
      {/* <h1>String Case Converter</h1> */}
      <TextArea rows={5} cols={50} value={input} onChange={handleInputChange} placeholder="Enter your text here" />
      <br />
      <br />
      <Select 
      defaultValue={StringCaseEnum.upperCase}
      style={{ width: 375 }}
      onChange={handleChange}
      options={[
        { value: StringCaseEnum.upperCase, label: "Uppercase"},
        { value: StringCaseEnum.lowerCase, label: "Lowercase"},
        { value: StringCaseEnum.capitalize, label: "Capitalize"},
        // { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
      <br />
      <br />
      {/* <button onClick={convertString}>Convert</button> */}
      {/* <h2>Output</h2> */}
      <TextArea 
        value={output}
        readOnly
        rows={5}
        cols={50}
      />
    </div>
    </section>
    </DefaultLayout>
    </ToolContext.Provider>
  );
};

export default StringCaseConverter;
