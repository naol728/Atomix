import { createContext, useContext } from "react";
import { AtomixStore, StoreProviderProps } from "./types/types";
/* 
for each state in the app we created context to acess the state from any where and also this makes the app more performant 
by makeing the consumers to re render when they subscribed state chnaged 

the main goal of this is to make the librery more simpler to use when to dispatch an action and to select the state 
*/
export const AtomixContext = createContext<AtomixStore<any, any> | null>(null);

export const AtomixProvider = <TState, TActions>({
    store,
    children,
}: StoreProviderProps<TState, TActions>) => {
    return (
        <AtomixContext.Provider value={store}>
            {children}
        </AtomixContext.Provider>
    );
};
export const useCurrentAtomix = <
    TState = any,
    TActions = Record<string, any>
>(): AtomixStore<TState, TActions> => {
    const store = useContext(AtomixContext);
    if (!store) {
        throw new Error("❌ useCurrentStore must be used within a <StoreProvider>");
    }
    return store;
};
