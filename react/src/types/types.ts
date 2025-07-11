import { Listener, Selector } from "atomix-core";

export interface AtomixStore<TState = any, TActions = any> {
  getState: () => TState;
  subscribe: <U>(
    selector: Selector<TState, U>,
    listener: Listener<U>
  ) => () => void;
  setState: (
    updater: Partial<TState> | ((prev: TState) => Partial<TState>)
  ) => void;
  notify: (newState: TState) => void;
  [K: string]: any;
}

export interface StoreProviderProps<TState, TActions> {
  store: AtomixStore<TState, TActions>;
  children: React.ReactNode;
}
