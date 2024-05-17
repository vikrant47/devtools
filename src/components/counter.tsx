import { useState } from 'react';
import { Button } from 'antd';

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Button type="primary" onClick={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};
