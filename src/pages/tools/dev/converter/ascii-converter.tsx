import { InputWithAction } from '@/components/devtools/generators/input-with-action';
import ToolHeader from '@/components/tool-header';
import { ToolContext } from '@/contexts/tool-context';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import { Flex, Input, Select } from 'antd';
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

    const handleConvert = (value: string) => {
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
                    <div className="tools-container w-9/12 h-5/6">
                        <Flex className="gap-5" justify='space-between' align="center">
                            <InputWithAction
                                className="flex flex-col gap-4 w-full h-full"
                                placeholder="Convert Text to ASCII"
                                value=""
                                applyOnChange={true}
                                //  onChange={(e) => setUrl(e.target.value)}
                                onAction={(value: string) => {
                                    return value
                                        .split('')
                                        .map(char => char.charCodeAt(0).toString())
                                        .join(' ');
                                }}
                                actionText="Text to ASCII"
                                inputType="textarea"
                                showSnippet={true}
                            />
                            <InputWithAction
                                className="flex flex-col gap-4 w-full h-full"
                                placeholder="Convert ASCII to Text"
                                value=""
                                applyOnChange={true}
                                //  onChange={(e) => setUrl(e.target.value)}
                                onAction={(value: string) => {
                                    return value
                                        .split(' ')
                                        .map(char => String.fromCharCode(parseInt(char, 10)))
                                        .join('');;
                                }}
                                actionText="ASCII to Text"
                                inputType="textarea"
                                showSnippet={true}
                            />
                        </Flex>


                        {/* <div style={{ marginBottom: '1rem' }}>
                <TextArea rows={5} cols={50} value={input} onChange={handleInputChange} />
            </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <Select
                                defaultValue='asciiToText'
                                style={{ width: 400 }}
                                onChange={handleConvert}
                                options={[
                                    { value: 'asciiToText', label: "ASCII to Text" },
                                    { value: 'textToAscii', label: "Text to ASCII" },
                                ]}
                            />
                        </div>
            <div style={{ marginBottom: '1rem' }}>
            <TextArea rows={5} cols={50} value={output}/>
            </div> */}


                    </div>
                </section>
            </DefaultLayout>
        </ToolContext.Provider>
    );
}

export default Home;