import { counterStore } from './store/store'
import { useStore } from 'atomix-react'

export default function Componet1() {
    const count = useStore(counterStore, (s) => s)

    console.log("componet1 re renderd")
    return (
        <div>
            <h1>Count:{count as number} </h1>
            <button onClick={counterStore.increment}>increment</button>
            <button onClick={counterStore.decrement}>decrement</button>
            <button onClick={() => counterStore.setState((state) => ({ count: state.count - 10 }))}>decrease by 10</button>
            <button onClick={() => counterStore.paramincrement(10)}>param increment</button>
        </div>
    )
}
