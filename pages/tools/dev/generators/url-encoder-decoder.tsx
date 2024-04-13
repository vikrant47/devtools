// make class for url encoder and decoder

import ToolHeader from "@/components/tool-header";
import DefaultLayout from "@/layouts/default";
import { ToolDefinition } from "@/types/tool.definition";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";

export const UrlConfig: ToolDefinition = {
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URL strings.',
    image: '/icons/tools/generators/url-encoder-decoder.png',
    href: '/tools/dev/generators/url-encoder-decoder',
    active: true,
    featured: true
};

export default function UrlEncoderDecoder() {
    const [inputText, setInputText] = useState<string>('');
    const [encodedUrl, setEncodedUrl] = useState<string>('');
    const [decodedUrl, setDecodedUrl] = useState<string>('');

    const encodeUrl = () => {
        const encoded = encodeURIComponent(inputText);
        setEncodedUrl(encoded);
    };

    const decodeUrl = () => {
        const decoded = decodeURIComponent(inputText);
        setDecodedUrl(decoded);
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <ToolHeader definition={UrlConfig} />
                <div>
                    <h1>URL Encoder/Decoder</h1>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter URL..."
                    />
                    <br />
                    <button onClick={encodeUrl}>Encode</button>
                    <button onClick={decodeUrl}>Decode</button>
                    <br />
                    <h2>Encoded URL:</h2>
                    <p>{encodedUrl}</p>
                    <h2>Decoded URL:</h2>
                    <p>{decodedUrl}</p>
                </div>

            </section>
        </DefaultLayout>
    );
}
