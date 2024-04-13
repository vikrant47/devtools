import { Base64Config } from '@/pages/tools/dev/generators/base64-encoder-decoder';
import { RandomNumberConfig } from '@/pages/tools/dev/generators/random-number-generator';
import { UrlConfig } from '@/pages/tools/dev/generators/url-encoder-decoder';
import { UUIDConfig } from '@/pages/tools/dev/generators/uuid-generator';
import { ToolDefinition, Tools } from '@/types/tool.definition';

export const ToolsConfig: Tools = {
  categories: [
    {
      name: 'Development',
      subCategories: [
        {
          name: 'Generators',
          tools: [{ ...UUIDConfig, featured: true }, RandomNumberConfig, Base64Config, UrlConfig]
        }
      ]
    },
    {
      name: 'Design',
      subCategories: []
    },
    {
      name: 'Utilities',
      subCategories: []
    }
  ]
};
export const getToolsConfigAsArray = (filter: Partial<ToolDefinition>) => {
  const tools: any[] = [];
  ToolsConfig.categories.forEach((category) => {
    category.subCategories.forEach((subCategory) => {
      subCategory.tools.forEach((tool) => {
        const toolWithMetadata: any = {
          ...tool,
          category: category.name,
          subCategory: subCategory.name
        };
        if (Object.keys(filter).length === 0) {
          tools.push(toolWithMetadata);
          return;
        }
        const matchesFilter = Object.keys(filter).every(
          // @ts-ignore
          (key) => toolWithMetadata[key] === filter[key]
        );
        if (matchesFilter) {
          tools.push(toolWithMetadata);
        }
      });
    });
  });
  return tools;
};
