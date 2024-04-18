import { Children, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

export function FullScreen(props: any) {
  const { children } = props;
  const onExpand = props.onExpand || function () {};
  const onCollapse = props.onCollapse || function () {};
  const [fullScreenClass, setFullScreenClass] = useState('');
  return (
    <div className={`fullscreen-wrapper ${fullScreenClass}`}>
      <div
        className="action-bar"
        style={{ position: 'absolute', right: '10px', top: '5px', zIndex: '999' }}>
        <Tooltip placement="top" title="Expand">
          <Button
            type="link"
            shape="round"
            icon={<FullscreenOutlined />}
            size="small"
            style={{ display: fullScreenClass === 'full-screen' ? 'none' : 'block' }}
            onClick={() => {
              setFullScreenClass('full-screen');
              onExpand();
            }}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="Collapse">
          <Button
            shape="round"
            type="link"
            icon={<FullscreenExitOutlined />}
            size="small"
            style={{ display: fullScreenClass !== 'full-screen' ? 'none' : 'block' }}
            onClick={() => {
              setFullScreenClass('');
              onCollapse();
            }}
          />
        </Tooltip>
      </div>
      {children}
    </div>
  );
}
FullScreen.propTypes = {
  children: PropTypes.any,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func
};
