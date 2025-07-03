import { useSyncExternalStore } from "react";
import type { Store } from "atomix-core";

export function useStore<T, Selected>(
  store: Store<T>,
  selector: (state: T) => Selected
): Selected {
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState())
  );
}
