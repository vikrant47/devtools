import { Button, Snippet, Textarea } from '@nextui-org/react';
import React from 'react';

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
        <Textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <Button style={actionStyle} color="primary" onClick={onAction}>
        {actionText}
      </Button>
      <div
        className="flex flex-col items-center justify-center gap-4"
        style={{ display: showSnippet ? 'block' : 'none' }}>
        <Snippet symbol="#" variant="bordered" onCopy={() => {}}>
          {snippetValue}
        </Snippet>
      </div>
    </div>
  );
}
