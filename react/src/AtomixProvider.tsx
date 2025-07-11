import React, { createContext, useContext } from "react";

// Listener and Selector types
type Listener<U> = (selectedValue: U) => void;
type Selector<T, U> = (state: T) => U;

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

    // Actions
    [K: string]: any;
}

// Context
const StoreContext = createContext<AtomixStore<any, any> | null>(null);

// Provider props
interface StoreProviderProps<TState, TActions> {
    store: AtomixStore<TState, TActions>;
    children: React.ReactNode;
}

// StoreProvider component
export const StoreProvider = <TState, TActions>({
    store,
    children,
}: StoreProviderProps<TState, TActions>) => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

// useCurrentStore hook
export const useCurrentStore = <
    TState = any,
    TActions = Record<string, any>
>(): AtomixStore<TState, TActions> => {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("❌ useCurrentStore must be used within a <StoreProvider>");
    }
    return store;
};
