import { useCallback } from 'react';
import _ from 'lodash';

export function useDebounce(delay = 200) {
  return useCallback(
    _.debounce((callback: () => any) => {
      callback();
    }, delay),
    []
  );
}
