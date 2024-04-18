import React from 'react';
import { Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CodeSnippet } from '@/components/system/utils/code.snippet';

export interface InputWithActionProps {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  onAction: () => void;
  inputType?: 'textarea' | 'input';
  showSnippet?: boolean;
  snippetValue?: string;
  actionStyle?: React.CSSProperties;
  actionText?: string;
  style?: React.CSSProperties;
  className?: string;
}

const DEFAULT_PROPS: InputWithActionProps = {
  placeholder: 'Enter Input',
  value: '',
  onChange: () => {},
  onAction: () => {},
  inputType: 'input',
  showSnippet: false,
  snippetValue: '',
  actionStyle: {},
  actionText: 'Action',
  style: {},
  className: ''
};

export function InputWithAction(props: InputWithActionProps) {
  const {
    placeholder,
    value,
    onChange,
    onAction,
    inputType,
    showSnippet,
    snippetValue,
    actionStyle,
    actionText,
    style,
    className
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <div className={className} style={style}>
      {inputType === 'textarea' ? (
        <TextArea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
        />
      ) : (
        <Input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
      )}
      <Button style={actionStyle} type="primary" onClick={onAction}>
        {actionText}
      </Button>
      {showSnippet && snippetValue && snippetValue.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <CodeSnippet code={snippetValue} />
        </div>
      )}
    </div>
  );
}
