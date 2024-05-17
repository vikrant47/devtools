import { JSONViewer } from '@/components/devtools/json/json-viewer';
import { Allotment } from 'allotment';
import { useRef } from 'react';
import 'allotment/dist/style.css';
import { ToolDefinition } from '@/types/tool.definition';
import DefaultLayout from '@/layouts/default';
import ToolHeader from '@/components/tool-header';
import { Button, Checkbox, Space, Tooltip } from 'antd';
import { ToolContext } from '@/contexts/tool-context';

export const JSONDiffCheckerConfig: ToolDefinition = {
  title: 'JSON Diff Checker',
  description: 'Compare two JSON objects and find the differences between them',
  image: '/icons/tools/generators/uuid-generator.png',
  href: '/tools/dev/diff/json-formatter',
  active: true,
  featured: true
};
const centerWidth = 100;
export default function JSONDiffChecker() {
  const allotmentRef = useRef(null);
  const actionBarRef = useRef<HTMLDivElement>(null);

  return (
    <ToolContext.Provider value={JSONDiffCheckerConfig}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center">
          <ToolHeader />
          <div className="json-diff w-full relative" style={{ height: '70vh' }}>
            <div
              ref={actionBarRef}
              className="diff-action-wrapper  flex-col items-center justify-center gap-4 absolute  top-20 z-40 pt-12 pb-12"
              style={{ width: centerWidth - 14 + 'px' }}>
              <div className="w-full pb-2">
                <Button.Group className="w-full">
                  <Tooltip title="Copy >>">
                    <Button
                      className="!w-1/2  text-right"
                      icon={<i className="fa fa-greater-than" />}
                      onClick={() => {}}></Button>
                  </Tooltip>
                  <Tooltip title="<< Copy ">
                    <Button
                      className="!w-1/2  text-left"
                      icon={<i className="fa fa-less-than" />}
                      onClick={() => {}}></Button>
                  </Tooltip>
                </Button.Group>
              </div>
              <Tooltip title="Compare">
                <Button className="!w-full !p-0" onClick={() => {}}>
                  <Checkbox className="p-2 pb-3" onChange={() => {}}>
                    Diff
                  </Checkbox>
                </Button>
              </Tooltip>
            </div>
            <Allotment
              ref={allotmentRef}
              defaultSizes={[100, 100]}
              onChange={(paneSizes) => {
                if (actionBarRef?.current)
                  actionBarRef.current.style.left = `${paneSizes[0] + 8 - centerWidth / 2}px`;

                //  actionBarRef.current?.style.left = `${paneSizes[0] + 2}px`;
              }}>
              <Allotment.Pane minSize={200} visible={true}>
                <div className="flex ">
                  <div
                    className="json-viewer w-full"
                    style={{ paddingRight: centerWidth / 2 - 4 + 'px' }}>
                    <JSONViewer />
                  </div>
                </div>
              </Allotment.Pane>
              <Allotment.Pane>
                <div className="flex relative">
                  <div
                    className="json-viewer w-full"
                    style={{ paddingLeft: centerWidth / 2 - 4 + 'px' }}>
                    <JSONViewer />
                  </div>
                </div>
              </Allotment.Pane>
            </Allotment>
          </div>
        </section>
      </DefaultLayout>
    </ToolContext.Provider>
  );
}
