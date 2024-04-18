import { connectToChild } from 'penpal';
import { BeanManager } from '../system/bean.manager';
import eventBusManager from '../event/event.bus.manager';
import { PanpalEventRegistry } from './panpal.event.handler';

export const PanpalEventBus = eventBusManager.instance().newBus('panpal.bus');

export const PanpalParentService = BeanManager.register(
  class PanpalParentService {
    protected connection: any = null;
    protected child: any = null;
    async reconnect(iframeElement: HTMLElement) {
      this.connection = await connectToChild({
        // The iframe to which a connection should be made
        //@ts-ignore
        iframe: iframeElement,
        // Methods the parent is exposing to the child
        methods: {
          async emit(event: string, payload: any) {
            // console.log('emit', event, payload);
            return await PanpalEventRegistry.instance().invoke(event, payload);
          }
        }
      });
      this.child = await this.connection.promise;
      return this;
    }
    async connect(iframeElement: HTMLElement) {
      return this.reconnect(iframeElement);
    }
  }
);
