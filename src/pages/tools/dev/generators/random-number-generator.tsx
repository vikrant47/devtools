import { Button, Input } from 'antd';
import { useState } from 'react';
import { ToolDefinition } from '@/types/tool.definition';
import ToolHeader from '@/components/tool-header';
import DefaultLayout from '@/layouts/default';

export const RandomNumberConfig = {
  title: 'Random Number Generator',
  description: 'Generate random numbers with different options.',
  image: 'https://via.placeholder.com/150',
  href: '/tools/dev/generators/random-number-generator',
  active: true,
  featured: false
};

const RandomNumberGenerator = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={RandomNumberConfig} />
        <div className="tools-container">
          Enter min{' '}
          <Input
            type="number"
            value={min}
            onChange={(e) => {
              setMin(parseInt(e.target.value));
            }}
          />
          Enter max{' '}
          <Input
            type="number"
            value={max}
            onChange={(e) => {
              setMax(parseInt(e.target.value));
            }}
          />
          <Button
            className="w-full"
            type="primary"
            onClick={() => {
              setRandomNumber(Math.floor(Math.random() * (max - min + 1)) + min);
            }}>
            Generate
          </Button>
          <p>{randomNumber}</p>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default RandomNumberGenerator;
