import { ReactNode } from 'react';

export function ReactIf({ condition, children }: { condition: boolean; children: ReactNode }) {
  if (condition) {
    return <>{children}</>;
  }
  return <> </>;
}
