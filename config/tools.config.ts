import { UUIDConfig } from '@/pages/tools/dev/generators/uuid-generator';
import { Tools } from '@/types/tool.definition';

export const ToolsConfig: Tools = {
  categories: [
    {
      name: 'Development',
      subCategories: [
        {
          name: 'Generators',
          tools: [UUIDConfig]
        }
      ]
    }
  ]
};
export const getToolsConfigAsArray = () => {
  const tools: any[] = [];
  ToolsConfig.categories.forEach((category) => {
    category.subCategories.forEach((subCategory) => {
      subCategory.tools.forEach((tool) => {
        tools.push({ tool, category: category.name, subCategory: subCategory.name });
      });
    });
  });
  return tools;
};
