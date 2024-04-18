import { EventBus } from '../event/event.bus';
import { BeanManager } from '../system/bean.manager';
import { NotificationService } from './notification.service';
import { TourService } from './tour.service';

export const TEMPLATE_CONG_LOCAL_STORAGE_KEY = 'user-journey-configured-templates';
export const TEMPLATE_CREATED_LOCAL_STORAGE_KEY = 'user-journey-created-templates';
export const TEMPLATE_PUBLISHED_LOCAL_STORAGE_KEY = 'user-journey-published-templates';

const tourService = TourService.instance();
export enum UserJourneyEvent {
  TEMPLATE_CONFIGURED = 'TEMPLATE_CONFIGURED',
  TEMPLATE_CREATED = 'TEMPLATE_CREATED',
  MACRO_RENDERED = 'MACRO_RENDERED',
  TEMPLATE_PUBLISHED = 'TEMPLATE_PUBLISHED',
  TEMPLATE_UPDATED = 'TEMPLATE_UPDATED',
  TOUR_COMPLETED = 'TOUR_COMPLETED',
  TEMPLATE_LIB_LIKED = 'TEMPLATE_LIB_LIKED',
  TEMPLATE_LIB_DISLIKED = 'TEMPLATE_LIB_DISLIKED',
  TEMPLATE_LIB_FAV = 'TEMPLATE_LIB_FAV'
}
export const UserJourneyEventBus = new EventBus('UserJourneyEventBus');

const notificationService = NotificationService.instance();

export const UserJourneyService = BeanManager.register(
  class UserJourneyService {
    logEvent(event: UserJourneyEvent, data?: any) {
      const totalConfigured = this.trackEventInLocalStorage(
        TEMPLATE_CONG_LOCAL_STORAGE_KEY,
        event,
        data.templateId
      );
      switch (event) {
        case UserJourneyEvent.TEMPLATE_CONFIGURED:
          //@eslint-disable-next-line
          if (totalConfigured.length === 1) {
            tourService.showConfetti();
            notificationService.showNotification({
              type: 'success',
              message: 'Congratulations!',
              description: 'You have configured your first template!'
            });
          }
          break;
        case UserJourneyEvent.TEMPLATE_CREATED:
          this.trackEventInLocalStorage(TEMPLATE_CREATED_LOCAL_STORAGE_KEY, event, data.templateId);
          break;
        case UserJourneyEvent.MACRO_RENDERED:
          break;
        case UserJourneyEvent.TEMPLATE_PUBLISHED:
          const totalPublished = this.trackEventInLocalStorage(
            TEMPLATE_PUBLISHED_LOCAL_STORAGE_KEY,
            event,
            data.templateId
          );
          if (totalPublished.length === 1) {
            tourService.showConfetti();
            notificationService.showNotification({
              type: 'success',
              message: 'Congratulations!',
              description: 'You have published your first template! Now you can configure it.'
            });
          }
          break;
      }
      UserJourneyEventBus.emit(event, data);
    }
    trackEventInLocalStorage(storageKey: string, event: UserJourneyEvent, id: string): string[] {
      const eventIds = JSON.parse(localStorage.getItem(storageKey) || '') || [];
      // if (events.includes(id)) return events;
      if (eventIds.length > 10) eventIds.shift();
      eventIds.push(id);
      localStorage.setItem(storageKey, JSON.stringify(eventIds));
      return eventIds;
    }
  }
);
