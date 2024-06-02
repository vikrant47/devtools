import ToolHeader from '@/components/tool-header';
import { ToolContext } from '@/contexts/tool-context';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import {Input, Select} from 'antd';
const { TextArea } = Input;
import { useState, ChangeEvent } from 'react';

export const ASCIIConverterConfig: ToolDefinition = {
    title: 'ASCII Converter',
    description: 'Convert ASCII to Text',
    image: '/icons/tools/generators/ascii-converter.png',
    href: '/tools/dev/converter/ascii-converter',
    active: true,
    featured: true
  };
  
const asciiToText = (ascii: string): string => {
    return ascii
        .split(' ')
        .map(char => String.fromCharCode(parseInt(char, 10)))
        .join('');
};

const textToAscii = (text: string): string => {
    return text
        .split('')
        .map(char => char.charCodeAt(0).toString())
        .join(' ');
};

const Home: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [conversionType, setConversionType] = useState<'asciiToText' | 'textToAscii'>('asciiToText');

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleConversionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleConvert(e.target.value as 'asciiToText' | 'textToAscii')
    };

    const handleConvert = (value:string) => {
        setConversionType(value as 'asciiToText' | 'textToAscii');
        if (value === 'asciiToText') {
            setOutput(asciiToText(input));
        } else {
            setOutput(textToAscii(input));
        }
    };

    return (
        <ToolContext.Provider value={ASCIIConverterConfig}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <ToolHeader />
        <div>
            <div style={{ marginBottom: '1rem' }}>
                {/* <label htmlFor="inputText">Input:</label> */}
                <TextArea rows={5} cols={50} value={input} onChange={handleInputChange} />
                {/* <textarea
                    id="inputText"
                    value={input}
                    onChange={handleInputChange}
                    rows={5}
                    style={{ width: '100%' }}
                /> */}
            </div>
                        <div style={{ marginBottom: '1rem' }}>
                            {/* <select
                                id="conversionType"
                                value={conversionType}
                                onChange={handleConversionTypeChange}
                                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            >
                                <option value="asciiToText">ASCII to Text</option>
                                <option value="textToAscii">Text to ASCII</option>
                            </select> */}
                            <Select
                                defaultValue='asciiToText'
                                style={{ width: 400 }}
                                onChange={handleConvert}
                                options={[
                                    { value: 'asciiToText', label: "ASCII to Text" },
                                    { value: 'textToAscii', label: "Text to ASCII" },
                                    // { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                            />
                        </div>
            {/* <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={handleConvert}
                    style={{ width: '100%', padding: '1rem', fontSize: '1rem', cursor: 'pointer' }}
                >
                    Convert
                </button>
            </div> */}
            <div style={{ marginBottom: '1rem' }}>
            <TextArea rows={5} cols={50} value={output}/>
                {/* <textarea
                    id="outputText"
                    value={output}
                    readOnly
                    rows={5}
                    style={{ width: '100%' }}
                /> */}
            </div>
        </div>
        </section>
    </DefaultLayout>
    </ToolContext.Provider>
    );
}

export default Home;