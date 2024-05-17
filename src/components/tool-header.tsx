import { ToolDefinition } from '@/types/tool.definition';
import { title, subtitle } from '@/components/primitives';
import { useContext } from 'react';
import { ToolContext, ToolContextProps } from '@/contexts/tool-context';

export default function ToolHeader() {
  const definition = useContext(ToolContext);
  return (
    <div className="inline-block text-center justify-center">
      {/* <h4 className={subtitle({ class: 'mt-4' })}>{definition.description}</h4> */}
    </div>
  );
}
