import { env } from '../../../../env';
import { BeanManager } from '../system/bean.manager';

export const CookieService = BeanManager.register(
  class CookieService {
    isCookieConcentRequired() {
      return env.ENABLE_COOKIE_BANNER && !localStorage.getItem('cookiesAccepted');
    }
    isCookiePolicyAccepted() {
      if (this.isCookieConcentRequired()) {
        return localStorage.getItem('cookiesAccepted') === 'true';
      }
      return true;
    }
    acceptCookiePolicy() {
      localStorage.setItem('cookiesAccepted', 'true');
    }
    rejectCookiePolicy() {
      localStorage.setItem('cookiesAccepted', 'false');
    }
    isAnalyticsEnabled() {
      return this.isCookiePolicyAccepted(); //&& localStorage.getItem('analyticsEnabled') === 'true';
    }
  }
);
