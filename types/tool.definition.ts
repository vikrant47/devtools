import { ReactComponentElement, ReactNode } from 'react';

export interface ToolDefinition {
  title: string;
  description: string;
  image: string;
  href: string;
}
export interface Tools {
  [key: string]: {
    [key: string]: {
      [key: string]: ToolDefinition;
    };
  };
}
