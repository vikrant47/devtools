import { Button, Tooltip } from 'antd';
import React, { Children, useEffect, useRef } from 'react';

export interface CopyToClipboardProps {
  text: string;
  style?: React.CSSProperties;
}
export function CopyToClipboard({ text, style = undefined }: CopyToClipboardProps) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div style={style} className="copy-to-clipboard">
      <div className="copy-to-clipboard__button">
        <Tooltip title={copied ? 'Copied' : 'Copy to clipboard'}>
          <Button
            type="link"
            icon={copied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
            onClick={() => {
              navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}></Button>
        </Tooltip>
      </div>
    </div>
  );
}
