import React, { useState, useEffect } from 'react';
import { Button, Drawer, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { CookieService } from '../../services/stats/cookie.service';
import { GtmService } from '../../services/stats/gtm.service';
import { env } from '../../../../env';

const cookieService = CookieService.instance();
const gtmService = GtmService.instance();
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (cookieService.isCookieConcentRequired()) {
      setVisible(true);
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };
  const onReject = () => {
    cookieService.rejectCookiePolicy();
    setVisible(false);
  };
  const onAccept = () => {
    cookieService.acceptCookiePolicy();
    gtmService.init(env.GA_TRACKING_ID);
    setVisible(false);
  };

  return (
    <Drawer
      title="Cookie Policy"
      placement="bottom"
      closable={false}
      onClose={onClose}
      open={visible}
      height={200}
      zIndex={99999}
      extra={
        <Space>
          <Button onClick={onAccept} type="primary" icon={<i className="fa fa-check"></i>}>
            Accept
          </Button>
          <Button
            onClick={onReject}
            style={{ marginRight: '16px' }}
            icon={<i className="fa fa-cancel"></i>}>
            Reject
          </Button>
        </Space>
      }>
      <Title level={5} style={{ marginBottom: '16px' }}>
        To provide you with the best user experience, we utilize cookies on this App.
      </Title>
      <Paragraph style={{ marginBottom: '24px' }}>
        Would you kindly accept our cookie policy?
      </Paragraph>
    </Drawer>
  );
}
