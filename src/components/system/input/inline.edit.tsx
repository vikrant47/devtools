import { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons';
/**
 * @type React.FC<InlineEdit.propTypes>
 */
export const InlineEdit = forwardRef(
  ({ value, placeholder, onChange, onSave, allowEdit, ...props }:any, ref) => {
    onChange = onChange || function () {};
    onSave = onSave || function () {};

    const [mode, setMode] = useState('view');
    const [editValue, setEditValue] = useState(value);
    /**@type {any}*/
    const inputRef = useRef<HTMLElement>();
    const onSubmit = () => {
      onSave(editValue);
      setMode('view');
    };
    useEffect(() => {
      setEditValue(value);
    }, [value]);
    useEffect(() => {
      if (mode === 'edit') {
        inputRef.current?.focus();
      }
    }, [mode]);
    if (mode == 'view') {
      return (
        <div className="view">
          <span>{editValue}</span>
          <Tooltip title="edit">
            <Button
              style={{ display: allowEdit ? 'inline-block' : 'none' }}
              size="small"
              type="link"
              onClick={() => {
                setMode('edit');
              }}
              icon={<EditOutlined />}></Button>
          </Tooltip>
        </div>
      );
    } else {
      return (
        <div className="edit" style={{ display: 'flex' }}>
          {/* <Input.Group compact={true}> */}
          <Input
            size="small"
            ref={inputRef}
            value={editValue}
            placeholder={placeholder}
            onChange={(e) => {
              setEditValue(e.target.value);
              onChange(e.target.value);
            }}
            onPressEnter={() => onSubmit()}
            onBlur={() => onSubmit()}
            {...props}
          />
          <Tooltip title="save">
            <Button
              type="link"
              size="small"
              onClick={() => onSubmit()}
              icon={<CheckCircleOutlined />}></Button>
          </Tooltip>
          {/* </Input.Group> */}
        </div>
      );
    }
  }
);
InlineEdit.displayName = 'InlineEdit';
InlineEdit.propTypes = {
  value: PropTypes.string,
  allowEdit: PropTypes.bool,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  placeholder: PropTypes.string
};
