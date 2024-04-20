import _ from 'lodash';
import { EventSubscription } from '../beans/event/event.subscription';
import { BaseEvent } from '../beans/event/base.event';

const logger = console;

export class EventBus {
  // tslint:disable-next-line:ban-types
  protected EventSubscriptions: { [key: string]: EventSubscription } = {} as {
    string: EventSubscription;
  };

  constructor(protected name: string) {}

  subscribe(
    callback: (event: BaseEvent, data: any) => any,
    filter?: (event: BaseEvent, data: any) => boolean,
    order = 1
  ) {
    //@ts-ignore
    const subId = (callback['_EventSubscriptionId'] = _.uniqueId(
      (this.name || '') + '_subscriber_'
    ));
    return (this.EventSubscriptions[subId] = new EventSubscription(
      subId,
      callback,
      () => {
        delete this.EventSubscriptions[subId];
      },
      filter,
      order
    ));
  }

  on(eventName: string, callback: (event: BaseEvent, data: any) => any, order = 1) {
    return this.subscribe(callback, (event, data) => event.name === eventName, order);
  }

  // tslint:disable-next-line:ban-types
  unsubscribe(callback: Function) {
    const subId = callback['_EventSubscriptionId'];
    delete this.EventSubscriptions[subId];
  }

  async emit(event: BaseEvent | string, data: any, ignoreError = false): Promise<any[]> {
    const results = [];
    if (typeof event === 'string') {
      event = new BaseEvent(event);
    }
    try {
      const subscriptions = Object.values(this.EventSubscriptions);
      logger.debug(`Emitting event ${event.name} on bus ${this.name}`, {
        subscriptions: subscriptions.length
      });
      for (const subs of subscriptions.sort((s1, s2) => s1.getOrder() - s2.getOrder())) {
        const result = await subs.invoke(event, data);
        results.push(result);
      }
    } catch (e) {
      if (ignoreError) {
        logger.error(
          'Error while processing event from bus ' + this.name + ' on event ' + event.name,
          e
        );
      } else {
        throw e;
      }
    }
    return results;
  }
}
