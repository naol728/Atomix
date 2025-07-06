import { useStore } from "atomix-react";
import { counterStore, InitalState } from "./store/store";

export default function App() {
    const count = useStore(counterStore, (s: InitalState) => s.count);
    return (
        <div>
            <h1>Count:{count as number} </h1>
            <button onClick={counterStore.increment}>increment</button>
            <button onClick={counterStore.decrement}>decrement</button>
            <button onClick={() => counterStore.paramincrement(10)}>param increment</button>
        </div>
    );
}