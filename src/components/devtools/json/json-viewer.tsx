import { Alert, Button, Card, Flex, Tabs, theme, Tooltip } from 'antd';
import { useState, useEffect, useRef } from 'react';
import ToolHeader from '@/components/tool-header';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import { Editor, useMonaco } from '@monaco-editor/react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { ReflectionUtil } from '@/utils/reflection.util';
import { TemplateEngine } from '@/utils/template.engine';
import { ThemeService } from '@/services/system/ui/theme.service';
import { FullScreen } from '@/components/system/fullscreen';
import { CopyToClipboard } from '@/components/system/utils/copy.to.clipboard';

const { TabPane } = Tabs;

export const JSONFormatterConfig: ToolDefinition = {
  title: 'JSON Formatter',
  description: 'Format JSON data with different options',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/diff/json-formatter',
  active: true,
  featured: true
};
const JAVASCRIPT_PREFIX = `
/**
 * Just return the target object
 */ 
return `;
export const jsonToJavascript = (json: string) => {
  return JAVASCRIPT_PREFIX + json + ';';
};
type Mode = 'text' | 'tree' | 'javaScript';

export const JSONViewer = () => {
  const [jsonText, setJsonText] = useState<string>('{}');
  const [javaScript, setJavascript] = useState<string>(JAVASCRIPT_PREFIX + '{};');
  const monaco = useMonaco();
  const editorRef: any = useRef(null);
  const [jsonTree, setJsonTree] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<Mode>('text');
  const [activeMode, setActiveMode] = useState<Mode>('text');
  const treeChanged = useRef<number>(1);
  const actions = [
    {
      key: 'format',
      label: 'Format',
      icon: 'fa fa-align-left',
      action: () => {
        setJsonText(JSON.stringify(jsonTree, null, 2));
      }
    },
    {
      key: 'minify',
      label: 'Minify',
      icon: 'fa fa-align-right',
      action: () => {
        setJsonText(JSON.stringify(jsonTree));
      }
    },
    {
      key: 'clear',
      label: 'Clear',
      icon: 'fa fa-trash',
      action: () => {
        setJsonText('{}');
      }
    }
  ];
  useEffect(() => {}, []);
  useEffect(() => {
    if (activeMode !== 'text') {
      return;
    }
    try {
      setJsonTree(JSON.parse(jsonText));
      setJavascript(jsonToJavascript(jsonText));
      setError('');
    } catch (e) {
      // @ts-ignore
      setError(e.message);
      setJsonTree({});
      console.error(e);
    }
  }, [jsonText]);

  useEffect(() => {
    if (activeMode !== 'javaScript') {
      return;
    }
    try {
      const obj = TemplateEngine.evalFunctionBody(javaScript, {});
      const stringified = JSON.stringify(obj, null, 2);
      setJsonText(stringified);
      setJsonTree(obj);
      setError('');
    } catch (e) {
      // @ts-ignore
      setError(e.message);
      setJsonTree({});
      console.error(e);
    }
  }, [javaScript]);

  useEffect(() => {
    if (activeMode !== 'tree') {
      return;
    }
    try {
      const stringified = JSON.stringify(jsonTree, null, 2);
      setJsonText(stringified);
      setJavascript(jsonToJavascript(stringified));
      setError('');
    } catch (e) {
      // @ts-ignore
      setError(e.message);
      setJsonTree({});
      console.error(e);
    }
  }, [jsonTree, treeChanged.current]);

  useEffect(() => {
    if (!monaco || !editorRef.current) return;
    // Your editor setup code here
    monaco.editor.setTheme(ThemeService.instance().getMonacoTheme());
  }, [monaco, editorRef.current]);
  const tabItems = [
    {
      key: 'text',
      label: 'Text',
      contents: (
        <div className="json-editor">
          <Editor
            onMount={(editor: any, monaco: any) => {
              // @ts-ignore
              editorRef.current = editor;
              monaco.editor.setTheme(ThemeService.instance().getMonacoTheme());
            }}
            height="50vh"
            defaultLanguage="json"
            value={jsonText}
            defaultValue="{}"
            onChange={(value: any) => {
              setActiveMode('text');
              setJsonText(value || '{}');
            }}
          />
        </div>
      )
    },
    {
      key: 'tree',
      label: 'Tree',
      contents: (
        <div className="json-tree-view" style={{ height: '50vh', overflow: 'auto' }}>
          <JsonView
            src={jsonTree}
            editable
            onChange={(e: any) => {
              setActiveMode('tree');
              setJsonTree(e.src);
              treeChanged.current++;
            }}
          />
        </div>
      )
    },
    {
      key: 'javaScript',
      label: 'JavaScript',
      contents: (
        <div className="javaScript-editor">
          <Editor
            theme={ThemeService.instance().getMonacoTheme()}
            onMount={(editor: any, monaco: any) => {
              // @ts-ignore
              editorRef.current = editor;
              setTimeout(() => {
                monaco.editor.setTheme(ThemeService.instance().getMonacoTheme());
              }, 500);
            }}
            height="50vh"
            language="javascript"
            defaultLanguage="javascript"
            value={javaScript}
            defaultValue="return {}"
            onChange={(value) => {
              setActiveMode('javaScript');
              setJavascript(value + '');
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="tools-container w-full json-formatter">
      <FullScreen onExpand={() => {}} onCollapse={() => {}} top="21px">
        <Card
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            setJsonText(text);
          }}
          extra={
            <div className="quick-action">
              <CopyToClipboard text={jsonText} />
            </div>
          }
          styles={{
            body: { padding: '0' },
            header: { margin: '0' },
            extra: { position: 'absolute', right: '38px', top: '0px', zIndex: 9 }
          }}
          tabList={tabItems}
          onTabChange={(key) => {
            setViewMode(key as Mode);
          }}>
          <div className="tab-content h-100">
            <div className="tab-actions p-2">
              <Flex gap="small" wrap="wrap">
                {actions.map((action) => (
                  <Tooltip key={action.key} title={action.label}>
                    <Button
                      className="border-0 shadow-none"
                      icon={<i className={action.icon} />}
                      onClick={action.action}
                    />
                  </Tooltip>
                ))}
              </Flex>
            </div>
            <div className="tab-content--inner">
              {tabItems.find((item) => item.key === viewMode)?.contents}
            </div>
            <div className="error-message relative">
              {error.trim().length > 0 && (
                <Alert
                  className="absolute bottom-0 w-full"
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  action={
                    <Button size="small" danger>
                      Detail
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </Card>
      </FullScreen>
    </div>
  );
};
