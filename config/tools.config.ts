import { UUIDConfig } from '@/pages/tools/dev/generators/uuid-generator';
import { Tools } from '@/types/tool.definition';

export const ToolsConfig: Tools = {
  dev: {
    generators: {
      uuid: UUIDConfig
    }
  }
};
