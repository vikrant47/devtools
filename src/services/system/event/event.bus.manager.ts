import { EventBus } from './event.bus';
import { BeanManager } from '../system/bean.manager';
import { EventSubscription } from '../../beans/event/event.subscription';
import { BaseEvent } from '../../beans/event/base.event';

const logger = console;
export enum Buses {
  DATABASE_EVENT_BUS = 'database_event_bus'
}

class EventBusManager {
  protected buses = {};

  register(name, bus: EventBus): this {
    logger.debug(`Registering event bus ${name}`);
    this.buses[name] = bus;
    return this;
  }
  isRegistered(name: string): boolean {
    return !!this.buses[name];
  }
  newBus(name: string): EventBus {
    if (this.isRegistered(name)) {
      logger.warn(`Event bus ${name} already registered`);
      return this.getBus(name);
    }
    const bus = new EventBus(name);
    this.register(name, bus);
    return bus;
  }

  getBus(name: string, create = true): EventBus {
    if (!this.isRegistered(name) && create) {
      this.newBus(name);
    }
    return this.buses[name];
  }

  destroyBus(name: string): this {
    delete this.buses[name];
    return this;
  }

  async emit(bus: string, event: BaseEvent, data: any) {
    return this.getBus(bus).emit(event, data);
  }

  // tslint:disable-next-line:ban-types
  subscribe(bus: string, callback: (event: BaseEvent, data: any) => any): EventSubscription {
    return this.getBus(bus).subscribe(callback);
  }
}

export default BeanManager.register(EventBusManager);
