import { BeanManager } from '../system/bean.manager';

import { CookieService } from './cookie.service';

const cookieService = CookieService.instance();

export const GtmService = BeanManager.register(
  class GtmService {
    enabled = false;
    enable(): this {
      this.enabled = true;
      return this;
    }
    disable(): this {
      this.enabled = false;
      return this;
    }
    shouldTrack(): boolean {
      return this.enabled && cookieService.isAnalyticsEnabled();
    }
    async init(trackingId: string) {
      if (!this.shouldTrack()) {
        return;
      }
      const ReactGA = await import('react-ga4');
      ReactGA.default.initialize([
        {
          trackingId,
          gaOptions: {
            cookieFlags: 'SameSite=None;Secure'
          } // optional
        }
      ]);
    }
    pageview(path: string) {
      if (!this.shouldTrack()) {
        return;
      }
      const page = '/' + this.customerId + path;
      // const page = path;
      this.send({ hitType: 'pageview', page, title: page });
    }
    send(params = {}) {
      if (!this.shouldTrack()) {
        return;
      }
      if (this.enabled) {
        import('react-ga4').then((ReactGA) => {
          ReactGA.default.send(params);
        });
      }
    }
  }
);
