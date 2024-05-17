import { ToolDefinition } from '@/types/tool.definition';
import { createContext } from 'react';
export interface ToolContextProps {
  definition: ToolDefinition;
}
export const ToolContext = createContext<ToolDefinition>({
  title: '',
  description: '',
  image: '',
  href: '',
  active: false
});
