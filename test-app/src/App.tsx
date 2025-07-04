import { createStore } from "atomix-core";
import { useStore } from "atomix-react";

const counterStore = createStore({ count: 0 }, (set) => ({
    increment: () => set((s) => ({ count: s.count + 1 })),
    decrement: () => set((s) => ({ count: s.count - 1 }))
}));

export default function App() {
    const count = useStore(counterStore, (s) => s.count);

    return (
        <div>
            <h1>Count:{count as number} </h1>
            <button onClick={counterStore.increment}>increment</button>
            <button onClick={counterStore.decrement}>decrement</button>
        </div>
    );
}