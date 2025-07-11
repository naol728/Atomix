import { useStore } from 'atomix-react'
import { counterStore, InitalState } from "./store/store"

export default function Componet2() {
    const name = useStore((s: InitalState) => s.name)

    console.log("componet2 re renderd")
    return (
        <div>
            <span>{name as string}</span>
            <br />
            <input type="text" onChange={(e) => counterStore.setName(e.target.value)} />
        </div>
    )
}
