import ToolHeader from '@/components/tool-header';
import { ToolContext } from '@/contexts/tool-context';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import { Button, Flex, Input } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

export const WERCalculatorConfig: ToolDefinition = {
  title: 'WER Calculator',
  description: 'Compare two transcript and find word error rate between them',
  image: '/icons/tools/generators/word-error-rate-checker.png',
  href: '/tools/dev/diff/word-error-rate-checker',
  active: true,
  featured: true
};

const WERCalculator: React.FC = () => {
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
    <ToolContext.Provider value={WERCalculatorConfig}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <ToolHeader />
          <div>
          <Flex className= "gap-4" justify='space-between'>
            <div>
              <div>
                <label>Enter Original Text:</label>
                <TextArea 
                rows={10}
                cols={10}
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)} />
              </div>
              <div>
                {/* <label>Upload Original Text File:</label> */}
                <Input type="file" accept=".txt" onChange={handleOriginalFileUpload} />
              </div>
            </div>
            <div>
              <div>
                <label>Enter Transcribed Text:</label>
                <TextArea
                rows={10}
                cols={10}
                value={transcribedText} 
                onChange={(e) => setTranscribedText(e.target.value)} />
              </div>
              <div>
                {/* <label>Upload Transcribed Text File:</label> */}
                <Input type="file" accept=".txt" onChange={handleTranscribedFileUpload} />
              </div>
            </div>
          </Flex>
          <br></br>
            <Button onClick={calculateWER}>Calculate WER</Button>/
             {/* <TextArea value ={toString(wer)}/> */}
            {wer !== null && (
              <div>
                <p>Word Error Rate: {wer}</p>
              </div>
            )}
          </div>
        </section>
      </DefaultLayout>
    </ToolContext.Provider>
  );
};

export default WERCalculator;
