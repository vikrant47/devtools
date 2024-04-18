import { ReactComponentElement, ReactNode } from 'react';

export interface ToolDefinition {
  title: string;
  description: string;
  image: string;
  href: string;
  featured?: boolean;
  active: boolean;
}
export interface ToolCategory {
  name: string;
  subCategories: ToolSubCategory[];
}
export interface ToolSubCategory {
  name: string;
  tools: ToolDefinition[];
}
export interface Tools {
  categories: ToolCategory[];
}

const x = [
  {
    category: {
      subCategory: {
        name: '',
        tools: [
          {
            title: 'string',
            description: 'string',
            image: 'string',
            href: 'string'
          }
        ]
      }
    }
  }
];
