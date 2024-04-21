import { CopyBlock } from 'react-code-blocks';
import { ReactIf } from '../conditional/r.if';
import { CopyToClipboard } from './copy.to.clipboard';
import { ThemeService } from '@/services/system/ui/theme.service';

export interface CodeSnippetProps {
  code: string;
  allowCopy?: boolean;
  language?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
}
export function CodeSnippet({
  code,
  language = 'bash',
  showLineNumbers,
  wrapLines = true,
  allowCopy = true
}: CodeSnippetProps) {
  return (
    <div className="code-snippet w-full" style={{ position: 'relative' }}>
      <CopyToClipboard text={code} style={{ position: 'absolute', right: 0, top: 0, zIndex: 9 }} />
      <CopyBlock
        onCopy={() => {}}
        text={code || '\n'}
        theme={ThemeService.instance().getCodeBlockTheme()}
        language={language}
        showLineNumbers={showLineNumbers}
      />
    </div>
  );
}
