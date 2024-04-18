import ToolHeader from '@/components/tool-header';
import DefaultLayout from '@/layouts/default';
import { ToolDefinition } from '@/types/tool.definition';
import { Editor, useMonaco } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import loader from '@monaco-editor/loader';
import { Tab, Tabs } from '@nextui-org/tabs';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { ReflectionUtil } from '@/utils/reflection.util';
import { TemplateEngine } from '@/utils/template.engine';

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

export default function JSONFormatter() {
  const [jsonText, setJsonText] = useState<string>('');
  const [javaScript, setJavascript] = useState<string>(JAVASCRIPT_PREFIX + '{};');
  const monacoInstance = useMonaco();
  const editorRef: any = useRef(null);
  const [jsonTree, setJsonTree] = useState<any>({});
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<Mode>('text');
  const [activeMode, setActiveMode] = useState<Mode>('text');
  const treeChanged = useRef(1);
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
    if (!monacoInstance || !editorRef.current) return;
    const jsonCode = [
      {
        enabled: true,
        description: 'something'
      }
    ];
    // const modelUri = monacoInstance.Uri.parse('json://grid/settings.json');
    // const jsonModel = monacoInstance.editor.createModel(
    //   JSON.stringify(jsonCode, null, '\t'),
    //   'json',
    //   modelUri
    // );
    // editorRef.current.setModel(jsonModel);
  }, [monacoInstance, editorRef.current]);
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToolHeader definition={JSONFormatterConfig} />
        {viewMode}
        <div className="tools-container w-full">
          <Card>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Tabs
                variant="underlined"
                onSelectionChange={(key) => {
                  setViewMode(key as Mode);
                }}>
                <Tab key="text" title="Text"></Tab>
                <Tab key="tree" title="Tree"></Tab>
                <Tab key="javaScript" title="JavaScript"></Tab>
              </Tabs>
            </CardHeader>
            <CardBody className="">
              <div className="tabs">
                {viewMode === 'text' && (
                  <div className="json-editor">
                    <Editor
                      onMount={(editor, monaco) => {
                        // @ts-ignore
                        editorRef.current = editor;
                      }}
                      height="50vh"
                      defaultLanguage="json"
                      value={jsonText}
                      defaultValue="{}"
                      onChange={(value) => {
                        setActiveMode('text');
                        setJsonText(value || '{}');
                      }}
                    />
                  </div>
                )}
                {viewMode === 'tree' && (
                  <div className="json-tree-view">
                    <JsonView
                      style={{ height: '50vh' }}
                      src={jsonTree}
                      editable
                      onChange={(e) => {
                        setActiveMode('tree');
                        setJsonTree(e.src);
                        treeChanged.current++;
                      }}
                    />
                  </div>
                )}
                {viewMode === 'javaScript' && (
                  <div className="javaScript-editor">
                    <Editor
                      onMount={(editor, monaco) => {
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
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
