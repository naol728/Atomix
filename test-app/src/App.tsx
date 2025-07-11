import { StoreProvider } from "atomix-react";
import Componet1 from "./Componet1";
import Componet2 from "./Componet2";
import { counterStore } from "./store/store";

export default function App() {
  return (
    <StoreProvider store={counterStore}>
      <Componet1 />
      <Componet2 />
    </StoreProvider >
  );
} 