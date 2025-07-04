import { useSyncExternalStore } from "react";

export const useStore = <STATE, U>(
  store: {
    getState: () => STATE;
    subscribe: (
      selector: (state: STATE) => U,
      listener: (selected: U) => void
    ) => () => void;
  },
  selector: (state: STATE) => U
): U => {
  return useSyncExternalStore(
    (callback) => store.subscribe(selector, callback),
    () => selector(store.getState())
  );
};
