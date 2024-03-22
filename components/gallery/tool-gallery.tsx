import { ToolDefinition } from '@/types/tool.definition';
import { title } from '../primitives';
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';

export function FeaturedTools({ tools }: { tools: ToolDefinition[] }) {
  return (
    <div>
      <h2 className={title()}>Featured Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.href} className="bg-white rounded-lg shadow-lg p-4">
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
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
    </div>
  );
}
