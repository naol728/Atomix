// Counter.tsx
import { useCounter } from "./counterStore";

function Counter() {
    const { count, increment, decrement } = useCounter();

    return (
        <>
            <h1>{count as number}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}
