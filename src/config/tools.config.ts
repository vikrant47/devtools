import { ASCIIConverterConfig } from '@/pages/tools/dev/converter/ascii-converter';
import { StringCaseConverterConfig } from '@/pages/tools/dev/converter/string-case-converter';
import { JSONDiffCheckerConfig } from '@/pages/tools/dev/diff/json-diff-checker';
import { JSONFormatterConfig } from '@/pages/tools/dev/diff/json-formatter';
import { WERCalculatorConfig } from '@/pages/tools/dev/diff/word-error-rate-checker';
import { Base64Config } from '@/pages/tools/dev/generators/base64-encoder-decoder';
import { RandomNumberConfig } from '@/pages/tools/dev/generators/random-number-generator';
import { UUIDConfig } from '@/pages/tools/dev/generators/uuid-generator';
import { URLDecoderConfig } from '@/pages/tools/dev/url/url-decoder';
import { URLEncoderConfig } from '@/pages/tools/dev/url/url-encoder';
import { ToolDefinition, Tools } from '@/types/tool.definition';

export const ToolsConfig: Tools = {
  categories: [
    {
      name: 'Development',
      subCategories: [
        {
          name: 'Generators',
          tools: [{ ...UUIDConfig, featured: true }, RandomNumberConfig, Base64Config]
        },
        {
          name: 'Converter',
          tools: [StringCaseConverterConfig,ASCIIConverterConfig]
        },
        {
          name: 'Formatters',
          tools: [
            { ...JSONFormatterConfig, featured: true },
            { ...JSONDiffCheckerConfig, featured: true },
            WERCalculatorConfig
          ]
        },
        {
          name: 'Encoder/Decoder',
          tools: [
            { ...URLEncoderConfig, featured: true },
            { ...URLDecoderConfig, featured: true }
          ]
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
