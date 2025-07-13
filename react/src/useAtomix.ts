import { useSyncExternalStore } from "react";
import { useCurrentAtomix } from "./AtomixProvider";
export const useAtomx = <TSTATE, TACTIONS, U>(
  selector: (state: TSTATE) => U
): U => {
  const store = useCurrentAtomix<TSTATE, TACTIONS>();
  return useSyncExternalStore(
    (callback) => store.subscribe(selector, callback),
    () => selector(store.getState()),
    () => selector(store.getState())
  );
};
