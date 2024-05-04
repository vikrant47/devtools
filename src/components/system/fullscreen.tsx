import { Children, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Tooltip } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

export interface FullScreenProps {
  children: React.ReactNode;
  onExpand?: () => void;
  onCollapse?: () => void;
  right?: string;
  top?: string;
}
export function FullScreen({
  onExpand = () => {},
  onCollapse = () => {},
  children,
  right = '10px',
  top = '5px'
}: FullScreenProps) {
  const [fullScreenClass, setFullScreenClass] = useState('');
  return (
    <div className={`fullscreen-wrapper ${fullScreenClass}`}>
      <div className="action-bar" style={{ position: 'absolute', right, top, zIndex: '999' }}>
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