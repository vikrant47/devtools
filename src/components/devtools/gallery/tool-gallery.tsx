import { ToolDefinition } from '@/types/tool.definition';
import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';

export function ToolGallery({ tools }: { tools: ToolDefinition[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tools.map((tool, i) => (
        <div key={i} className="rounded-lg">
          <Card
            className="p-5"
            style={{ width: 300 }}
            cover={
              <Image
                alt={tool.title}
                src={tool.image}
                preview={false}
                style={{ cursor: 'pointer' }}
              />
            }
            onClick={() => window.open(tool.href)}>
            <Meta title={tool.title} description={tool.description} />
          </Card>
        </div>
      ))}
    </div>
  );
}
