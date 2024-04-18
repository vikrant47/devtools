import { message, notification } from 'antd';
import { BeanManager } from '../system/bean.manager';

export const NotificationService = BeanManager.register(
  class NotificationService {
    api;
    messageApi;
    init({ api, messageApi }) {
      this.api = api;
      this.messageApi = messageApi;
      this.useGlobalConfig();
    }
    useGlobalConfig() {
      message.config({
        top: 100,
        duration: 2,
        maxCount: 3,
        rtl: true,
        prefixCls: 'my-message'
      });
      notification.config({
        placement: 'bottomRight',
        bottom: 50,
        duration: 3,
        rtl: true
      });
    }
    showNotification({
      type = 'info',
      message,
      description = undefined,
      icon = undefined,
      placement = undefined,
      duration = undefined,
      onClose = undefined,
      onClick = undefined,
      key = undefined
    }) {
      return this.api[type || 'info']({
        key,
        message,
        description,
        duration,
        onClick,
        onClose,
        icon,
        placement
      });
    }
    showMessage({
      type = undefined,
      content,
      duration = undefined,
      icon = undefined,
      onClose = undefined,
      onClick = undefined,
      key = undefined
    }) {
      this.messageApi.open({
        key,
        type: type || 'info',
        content,
        duration,
        icon,
        onClose,
        onClick
      });
    }
    /**@param {any} key */
    showNotificationByType({
      key = undefined,
      type,
      message,
      notificationType = 'message',
      ...props
    }) {
      if (notificationType === 'message') {
        return this.showMessage({ key, type, content: message, ...props });
      }
      return this.showNotification({ key, type, message, ...props });
    }
    /**
     * @param {any} key
     */
    info({ key = undefined, message, notificationType = 'message', ...props }) {
      return this.showNotificationByType({
        key,
        notificationType,
        message,
        type: 'info',
        ...props
      });
    }
    /**
     * @param {any} key
     */
    loading({ key = undefined, message, notificationType = 'message', ...props }) {
      return this.showNotificationByType({
        key,
        notificationType,
        message,
        type: 'loading',
        ...props
      });
    }
    /**
     * @param {any} key
     */
    warn({ key = undefined, message, notificationType = 'message', ...props }) {
      return this.showNotificationByType({
        key,
        message,
        type: 'warning',
        notificationType,
        ...props
      });
    }
    /**
     * @param {any} key
     */
    error({ key = undefined, message, notificationType = 'message', ...props }: any) {
      this.showNotificationByType({ key, type: 'error', message, notificationType, ...props });
    }
    /**
     * @param {any} key
     */
    success({ key = undefined, message, notificationType = 'message', ...props }) {
      this.showNotificationByType({ key, type: 'success', message, notificationType, ...props });
    }
  }
);
