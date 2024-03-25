import { ToolDefinition } from '@/types/tool.definition';
import { title as titleClass } from '../primitives';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

export function ToolGallery({ tools }: { tools: ToolDefinition[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, i) => (
        <div key={i} className=" rounded-lg  p-4">
          <Card className="py-4" isPressable onPress={() => window.open(tool.href)}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col">
              <p className="text-tiny uppercase font-bold">{tool.title}</p>
              <small className="text-default-500">{tool.description}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={tool.title}
                className="object-cover rounded-xl"
                src={tool.image}
                width={270}
              />
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
