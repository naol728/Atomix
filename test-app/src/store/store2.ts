import { createStore } from "atomix-core";

export const Store2 = createStore(
  {
    name: "",
  },
  (set) => ({
    setname: (name: string) => set(() => ({ name: name })),
  })
);
