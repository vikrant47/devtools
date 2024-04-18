import { BeanManager } from '../system/bean.manager';

export interface PanpalEventHandler {
  sortOrder: number;
  getEventNames(): string[];
  handle(event: string, payload: any): Promise<any>;
}
export class PanpalResponse {
  event: string;
  contents: any[];
  error: boolean;
  message: string;
  status: number;
  constructor(props: Partial<PanpalResponse>) {
    Object.assign(this, props);
  }
}
const PanpalEventRegistry = BeanManager.register(
  class PanpalEventRegistry {
    protected handlers: PanpalEventHandler[] = [];
    cleanup(): PanpalEventRegistry {
      this.handlers = [];
      return this;
    }
    register(...handlers: PanpalEventHandler[]): PanpalEventRegistry {
      this.handlers.push(...handlers);
      return this;
    }
    getHandlers(): PanpalEventHandler[] {
      return this.handlers;
    }
    async invoke(event: string, payload: any) {
      const handlers = this.handlers
        .filter((handler) => handler.getEventNames().includes(event))
        .sort((a, b) => a.sortOrder - b.sortOrder);
      if (handlers.length === 0) {
        return new PanpalResponse({
          event,
          contents: [],
          error: true,
          message: `No handler found for event ${event}`,
          status: 404
        });
      }
      try {
        const results = await Promise.all(
          handlers.map((handler) => handler.handle(event, payload))
        );
        return new PanpalResponse({
          event,
          contents: results,
          error: false,
          message: '',
          status: 200
        });
      } catch (e) {
        console.error('error while handling even ', { event, payload }, e);
        return new PanpalResponse({
          event,
          contents: [],
          error: true,
          message: e.message,
          status: 500
        });
      }
    }
  }
);
export { PanpalEventRegistry };
