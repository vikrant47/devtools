import { env } from '../../../../env';
import { MondayRuntime } from '../../../monday/services/monday.runtime';
import { BeanManager } from './bean.manager';

const runtime = MondayRuntime.instance();
const dayInMS = 1000 * 60 * 60 * 24;
export const AppSubscriptionService = BeanManager.register(
  class AppSubscriptionService {
    async shouldShowExtendSubscription(): Promise<boolean> {
      const subscription = await this.getSubscription();
      const renewDate = new Date(subscription.renewal_date);
      const today = new Date();
      const dayPassed =
        Math.floor(today.getTime() / dayInMS) - Math.floor(renewDate.getTime() / dayInMS);
      const daysLeft = await this.getDaysLeft();
      return daysLeft < 1 && dayPassed < 30;
    }
    async getSubscription() {
      const context = await runtime.getContext();
      if (!context.subscription) {
        return null;
      }
      return context.subscription;
    }
    async getDaysLeft(): Promise<number> {
      try {
        const subscription = await this.getSubscription();
        const token = await runtime.getParsedToken();
        const customerId = token.dat.slug;
        if (env.SUBS_WHITELIST_ACCOUNTS.filter((domain) => domain === customerId).length > 0) {
          return 3000; // 8 years
        }
        return subscription.days_left;
      } catch (e) {
        console.log(e);
        return 0;
      }
    }
    async isSubscriptionExpired(): Promise<boolean> {
      const daysLeft = await this.getDaysLeft();
      return daysLeft < 1;
    }
  }
);
