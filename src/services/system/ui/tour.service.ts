import { EventBus } from '../event/event.bus';
import { BeanManager } from '../system/bean.manager';
export const TourEventBus = new EventBus('TourEventBus');
export const TourService = BeanManager.register(
  class TourService {
    public showConfetti(duration = 5000): this {
      TourEventBus.emit('confetti.change', { show: true, duration });
      return this;
    }
    public hideConfetti(): this {
      TourEventBus.emit('confetti.change', { show: false });
      return this;
    }
    public startTour(name: string): this {
      localStorage.setItem(`tour-${name}`, 'true');
      return this;
    }
    public endTour(name: string): this {
      localStorage.setItem(`tour-${name}`, 'true');
      return this;
    }
    public isUserVisitedTour(name: string): boolean {
      return localStorage.getItem(`tour-${name}`) === 'true';
    }
  }
);
