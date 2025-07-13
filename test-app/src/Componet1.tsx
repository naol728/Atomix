import { Actions, counterStore, InitalState } from './store/store'
import { useActions, useAtomx } from 'atomix-react'

export default function Componet1() {
    const count = useAtomx((state: InitalState) => state.count)
    const { increment }: Actions = useActions()
    console.log("componet 1 re renderd")
    return (
        <div>
            <h1>Count:{count} </h1>
            <button onClick={increment}>increment</button>
            <button onClick={counterStore.decrement}>decrement</button>
            <button onClick={() => counterStore.setState((state) => ({ count: state.count - 10 }))}>decrease by 10</button>
            <button onClick={() => counterStore.paramincrement(10)}>param increment</button>
        </div>
    )
}
