import { Space } from 'antd';
import { ReactNode } from 'react';

export interface FaIconProps {
  className?: string;
  children?: ReactNode;
}

export default function FaIcon({ className, children }: FaIconProps) {
  if (children) {
    return (
      <Space>
        <i className={className}></i>
        {children}
      </Space>
    );
  }
  return <i className={className} />;
}
