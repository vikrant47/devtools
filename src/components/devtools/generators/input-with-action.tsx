import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CodeSnippet } from '@/components/system/utils/code.snippet';
import { useDebounce } from '@/hooks/useDebounce';

export interface InputWithActionProps {
  placeholder: string;
  value: string;
  onChange?: (e: any) => void;
  onAction: (value: string) => string;
  inputType?: 'textarea' | 'input';
  showSnippet?: boolean;
  snippetValue?: string;
  actionStyle?: React.CSSProperties;
  actionText?: string;
  style?: React.CSSProperties;
  className?: string;
  applyOnChange?: boolean;
  validator?: (rule: any, value: string) => Promise<any>;
}

export function InputWithAction({
  placeholder,
  value,
  onChange = () => {},
  onAction,
  inputType,
  showSnippet,
  snippetValue = '',
  actionStyle,
  actionText,
  style,
  className,
  applyOnChange = false,
  validator
}: InputWithActionProps) {
  const [snippet, setSnippet] = useState<string>(snippetValue);
  const debounce = useDebounce(200);

  const [form] = Form.useForm();

  useEffect(() => {
    setSnippet(snippetValue);
  }, [snippetValue]);

  const applyAction = (avalue: string) => {
    form.validateFields().then(() => {
      const value = onAction(avalue);
      if (typeof value === 'string') {
        setSnippet(value);
      }
    });
  };

  return (
    <div className={className} style={style}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ inputValue: value }}
        onValuesChange={(e) => {
          debounce(() => {
            applyOnChange && applyAction(e.inputValue);
          });
        }}
        onFinish={(e) => {
          applyAction(e.inputValue);
        }}>
        <Form.Item
          name="inputValue"
          rules={[{ required: true, message: 'Please input a value!' }, { validator }]}>
          {inputType === 'textarea' ? (
            <TextArea placeholder={placeholder} autoSize={{ minRows: 3, maxRows: 5 }} />
          ) : (
            <Input placeholder={placeholder} />
          )}
        </Form.Item>
        <Button htmlType="submit" style={actionStyle} type="primary">
          {actionText}
        </Button>
      </Form>
      {showSnippet && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <CodeSnippet code={snippet} />
        </div>
      )}
    </div>
  );
}
