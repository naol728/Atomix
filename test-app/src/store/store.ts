import { createStore } from "atomix-core";

export interface InitalState {
  count: number;
}
interface Actions {
  increment: () => void;
  decrement: () => void;
  paramincrement: (param: number) => void;
}

const initalstate: InitalState = {
  count: 0,
};

export const counterStore = createStore<InitalState, Actions>(
  initalstate,
  (set) => ({
    increment: () => set((s) => ({ count: s.count + 1 })),
    decrement: () => set((s) => ({ count: s.count - 1 })),
    paramincrement: (param) => set((s) => ({ count: s.count + param })),
  })
);
