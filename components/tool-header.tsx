import { ToolDefinition } from '@/types/tool.definition';
import { title, subtitle } from '@/components/primitives';

export default function ToolHeader({ definition }: { definition: ToolDefinition }) {
  return (
    <div className="inline-block max-w-lg text-center justify-center">
      <h1 className={title()}>{definition.title}</h1>
      <h4 className={subtitle({ class: 'mt-4' })}>{definition.description}</h4>
    </div>
  );
}
