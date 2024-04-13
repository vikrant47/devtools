// provide base64 encoder and decoder

import ToolHeader from "@/components/tool-header";
import DefaultLayout from "@/layouts/default";
import { ToolDefinition } from "@/types/tool.definition";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";

export const Base64Config: ToolDefinition = {
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode base64 strings.',
    image: '/icons/tools/generators/base64-encoder-decoder.png',
    href: '/tools/dev/generators/base64-encoder-decoder',
    active: true,
    featured: true
};




export default function Base64EncoderDecoder() {
    const encodeText = () => {
        const encoded = btoa(inputText);
        setEncodedText(encoded);
      };
    
      const decodeText = () => {
        const decoded = atob(inputText);
        setDecodedText(decoded);
      };

    const [inputText, setInputText] = useState<string>('');
    const [encodedText, setEncodedText] = useState<string>('');
    const [decodedText, setDecodedText] = useState<string>('');

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <ToolHeader definition={Base64Config} />
                <div>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to encode/decode"
                        rows={4}
                        cols={50}
                    />
                    <br></br>
                    {/* <ButtonGroup isDisabled>
                        <Button onClick={()=> encodeText()}>Encode to Base64</Button>
                        <Button onClick={()=> decodeText()}>Decode from Base64Three</Button>
                    </ButtonGroup> */}
                    <button className="mr-5" onClick={encodeText}>Encode to Base64</button>
                    <button className="mr-15"  onClick={decodeText}>Decode from Base64</button>
                    <div>
                        <strong>Encoded:</strong> {encodedText}
                    </div>
                    <div>
                        <strong>Decoded:</strong> {decodedText}
                    </div>
                </div>

        </section>            
        </DefaultLayout >
    );
}


