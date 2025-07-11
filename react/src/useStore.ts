import { useSyncExternalStore } from "react";
import { useCurrentStore } from "./AtomixProvider";
export const useStore = <TSTATE, TACTIONS, U>(
  selector: (state: TSTATE) => U
): U => {
  const store = useCurrentStore<TSTATE, TACTIONS>();
  return useSyncExternalStore(
    (callback) => store.subscribe(selector, callback),
    () => selector(store.getState()),
    () => selector(store.getState())
  );
};
