import ToolHeader from "@/components/tool-header";
import DefaultLayout from "@/layouts/default";
import { ToolDefinition } from "@/types/tool.definition";
import { useState } from "react";

export const WordErrorRateConfig: ToolDefinition = {
    title: 'Word Error Rate',
    description: 'Compare the accuracy of your transcriptions.',
    image: 'https://via.placeholder.com/150',
    href: '/tools/dev/compare/word-error-rate',
    active: false,
    featured: false
}

export default function WordErrorRate() {

  const [originalText, setOriginalText] = useState<string>('');
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [wer, setWER] = useState<number | null>(null);

  const calculateWER = () => {
    const distance = levenshtein(originalText, transcribedText);
    const wer = distance / originalText.split(/\s+/).length;
    setWER(wer);
  };

  const levenshtein = (a: string, b: string): number => {
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= a.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        let cost = 0;
        if (a[i - 1] !== b[j - 1]) {
          cost = 1;
        }
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + cost // substitution
        );
      }
    }

    return matrix[a.length][b.length];
  };

  const handleOriginalFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setOriginalText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleTranscribedFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setTranscribedText(text);
      };
      reader.readAsText(file);
    }
  };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"></section>
            <ToolHeader definition={WordErrorRateConfig} />
            <div className="tools-container">
                <h1>Word Error Rate Calculator</h1>
                <div>
                    <label>Upload Original Text File:</label>
                    <input type="file" accept=".txt" onChange={handleOriginalFileUpload} />
                </div>
                <div>
                    <label>Or Enter Original Text:</label>
                    <textarea value={originalText} onChange={(e) => setOriginalText(e.target.value)} />
                </div>
                <div>
                    <label>Upload Transcribed Text File:</label>
                    <input type="file" accept=".txt" onChange={handleTranscribedFileUpload} />
                </div>
                <div>
                    <label>Or Enter Transcribed Text:</label>
                    <textarea value={transcribedText} onChange={(e) => setTranscribedText(e.target.value)} />
                </div>
                <button onClick={calculateWER}>Calculate WER</button>
                {wer !== null && (
                    <div>
                        <p>Word Error Rate: {wer}</p>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
}