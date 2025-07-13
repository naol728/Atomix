import { useCurrentAtomix } from "./AtomixProvider";

export function useActions<TState, TActions>(): TActions {
  const store = useCurrentAtomix<TState, TActions>();

  const { getState, setState, subscribe, notify, ...actions } = store;
  return actions as TActions;
}
