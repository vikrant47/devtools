import { useState } from 'react';
import { Button, Input, Divider } from '@nextui-org/react';
import { v4 as valuev4 } from 'value';

export const BulkValueGenerator = ({ generator }: { generator: () => string }) => {
  const [count, setCount] = useState(1);
  const [values, setValues] = useState<string[]>(['']);

  const generateValues = () => {
    const newValues = [];
    for (let i = 0; i < count; i++) {
      newValues.push(generator() + '');
    }
    setValues(newValues);
  };

  const exportToFile = () => {
    const content = values.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'values.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Input
        type="number"
        min={1}
        value={count + ''}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
      <Button onClick={generateValues}>Generate {count} Values</Button>
      <Divider />
      <Button onClick={exportToFile}>Export to File</Button>

      <div>
        Generated Values:
        <ul></ul>
      </div>
    </div>
  );
};
