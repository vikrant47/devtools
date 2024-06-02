// provide base64 encoder and decoder

import ToolHeader from "@/components/tool-header";
import { ToolContext } from "@/contexts/tool-context";
import DefaultLayout from "@/layouts/default";
import { ToolDefinition } from "@/types/tool.definition";
import { Button, Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export const Base64Config: ToolDefinition = {
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode base64 strings.',
    image: '/icons/tools/generators/base64-encoder-decoder.png',
    href: '/tools/dev/generators/base64-encoder-decoder',
    active: true,
    featured: true
};




const Base64EncoderDecoder =() => {

    const encodeText = () => {
        const encoded = btoa(inputText);
        setOutput(encoded);
        setEncodedText(encoded);
      };
    
      
      const decodeText = () => {
        const decoded = atob(inputText);
        setOutput(decoded);
        setDecodedText(decoded);
      };

    const [inputText, setInputText] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [encodedText, setEncodedText] = useState<string>('');
    const [decodedText, setDecodedText] = useState<string>('');

    return (
        <ToolContext.Provider value={Base64Config}>
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <ToolHeader/>
                <div className= "gap-2">
                    <TextArea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to encode/decode"
                        rows={5}
                        cols={50}
                    />
                    <br></br>
                    {/* <ButtonGroup isDisabled>
                        <Button onClick={()=> encodeText()}>Encode to Base64</Button>
                        <Button onClick={()=> decodeText()}>Decode from Base64Three</Button>
                    </ButtonGroup> */}
                    <Flex className= "gap-4" justify='space-between'>
                    <Button onClick={encodeText}>Encode to Base64</Button>
                    <Button onClick={decodeText}>Decode from Base64</Button>
                    </Flex>
                    <TextArea rows={5} cols={50} value={output}/>
            </div>

                    {/* <div>
                        <strong>Encoded:</strong> {encodedText}
                    </div>
                    <div>
                        <strong>Decoded:</strong> {decodedText}
                    </div> */}

        </section>            
        </DefaultLayout >
        </ToolContext.Provider>
    );
}

export default Base64EncoderDecoder;