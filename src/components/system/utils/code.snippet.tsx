import { ReactIf } from '../conditional/r.if';
import { CopyToClipboard } from './copy.to.clipboard';

export interface CodeSnippetProps {
  code: string;
  allowCopy?: boolean;
}
export function CodeSnippet({ code, allowCopy = true }: CodeSnippetProps) {
  return (
    <div className="code-snippet" style={{ position: 'relative' }}>
      <ReactIf condition={allowCopy}>
        <CopyToClipboard style={{ position: 'absolute', right: '10px' }} text={code} />
      </ReactIf>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
