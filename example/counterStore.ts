import { createStore } from "atomix-core";
import { useStore } from "atomix-react";

const store = createStore({ count: 0 }, (set) => ({
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
}));

export const useCounter = () => {
  const count = useStore(store, (s) => s.count);
  return {
    count,
    increment: store.increment,
    decrement: store.decrement,
  };
};
