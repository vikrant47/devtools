import { BaseEvent } from './base.event';

export class EventSubscription {
  constructor(
    protected id: string,
    // tslint:disable-next-line:ban-types
    protected callback: (event: BaseEvent, data: any) => any,
    protected unSubsCallback: () => void,
    // tslint:disable-next-line:ban-types
    protected filterCallback?: Function,
    protected order = 1
  ) {}

  async invoke(event: BaseEvent, data) {
    if (this.filterCallback) {
      if (await this.filterCallback(event, data)) {
        return await this.callback.call(this, event, data);
      }
    } else {
      return this.callback(event, data);
    }
  }

  unsubscribe() {
    return this.unSubsCallback();
  }

  getOrder(): number {
    return this.order;
  }
}
