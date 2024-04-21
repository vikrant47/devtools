import { Card, Tabs } from 'antd';
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

const JSONFormatter = () => {
  const [jsonText, setJsonText] = useState<string>('');
  const [javaScript, setJavascript] = useState<string>(JAVASCRIPT_PREFIX + '{};');
  const monaco = useMonaco();
  const editorRef: any = useRef(null);
  const [jsonTree, setJsonTree] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<Mode>('text');
  const [activeMode, setActiveMode] = useState<Mode>('text');
  const treeChanged = useRef<number>(1);

  useEffect(() => {}, []);
  useEffect(() => {
    if (activeMode !== 'text') {
      return;
    }
    try {
      setJsonTree(JSON.parse(jsonText));
      setJavascript(jsonToJavascript(jsonText));
    } catch (e) {
      // @ts-ignore
      setError(e.message);
      setJsonTree({});
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
    }
  }, [jsonTree, treeChanged.current]);

  useEffect(() => {
    if (!monaco || !editorRef.current) return;
    // Your editor setup code here
    monaco.editor.setTheme(ThemeService.instance().getMonacoTheme());
  }, [monaco, editorRef.current]);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={JSONFormatterConfig} />
        {viewMode}
        <div className="tools-container w-full">
          <Card>
            <Tabs
              defaultActiveKey="text"
              onChange={(key: Mode) => setViewMode(key)}
              tabBarStyle={{ marginBottom: 0 }}>
              <TabPane tab="Text" key="text">
                <div className="json-editor">
                  <Editor
                    onMount={(editor: any, monaco: any) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    height="50vh"
                    defaultLanguage="json"
                    value={jsonText}
                    defaultValue="{}"
                    onChange={(value: string) => {
                      setActiveMode('text');
                      setJsonText(value || '{}');
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="Tree" key="tree">
                <div className="json-tree-view">
                  <JsonView
                    style={{ height: '50vh' }}
                    src={jsonTree}
                    editable
                    onChange={(e: any) => {
                      setActiveMode('tree');
                      setJsonTree(e.src);
                      treeChanged.current++;
                    }}
                  />
                </div>
              </TabPane>
              <TabPane tab="JavaScript" key="javaScript">
                <div className="javaScript-editor">
                  <Editor
                    theme={ThemeService.instance().getMonacoTheme()}
                    onMount={(editor: any, monaco: any) => {
                      // @ts-ignore
                      editorRef.current = editor;
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
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default JSONFormatter;
