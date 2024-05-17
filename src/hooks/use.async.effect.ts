import { useEffect } from 'react';

export function useAsyncEffect(effect: () => Promise<any>, deps: any[], cleanUp = () => {}) {
  useEffect(() => {
    (async () => {
      await effect();
    })();
    return cleanUp;
  }, deps);
}
