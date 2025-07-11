import { useStore } from 'atomix-react'
import { Store2 } from "./store/store2"

export default function Componet2() {
    const name = useStore(Store2, (s) => s)
    console.log("componet2 re renderd")
    return (
        <div>
            <span>{name as string}</span>
            <br />
            <input type="text" onChange={(e) => Store2.setname(e.target.value)} />
        </div>
    )
}
