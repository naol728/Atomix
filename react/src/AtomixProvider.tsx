import { createContext, useContext } from "react";
import { AtomixStore, StoreProviderProps } from "./types/types";
/* 
for each state in the app we created context to acess the state from any where and also this makes the app more performant 
by makeing the consumers to re render when they subscribed state chnaged 

the main goal of this is to make the librery more simpler to use when to dispatch an action and to select the state 
*/
export const StoreContext = createContext<AtomixStore<any, any> | null>(null);
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
