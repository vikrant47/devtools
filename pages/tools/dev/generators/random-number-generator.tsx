import ToolHeader from '@/components/tool-header';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import { Button, Input, Snippet } from '@nextui-org/react';
import { useState } from 'react';

export const RandomNumberConfig: ToolDefinition = {
  title: 'Random Number Generator',
  description: 'Generate random numbers with different options.',
  image: 'https://via.placeholder.com/150',
  href: '/tools/dev/generators/random-number-generator',
  active: true,
  featured: false
};

export default function RandomNumberGenerator() {
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={RandomNumberConfig } />
        <div className="tools-container">
          Enter min{' '}
          <Input
            type="number"
            value={min + ''}
            onChange={(e) => {
              setMin(parseInt(e.target.value));
            }}
          />
          Enter max{' '}
          <Input
            type="number"
            value={max + ''}
            onChange={(e) => {
              setMax(parseInt(e.target.value));
            }}
          />
          <Button
            className="w-full"
            color="primary"
            onClick={() => {
              setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);
            }}>
            Generate
          </Button>
          <Snippet symbol="#" variant="bordered">
            {randomNumber}
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
