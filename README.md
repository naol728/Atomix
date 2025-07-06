# ⚛️ Atomix

> **A lightweight, scalable, and reactive state management library for TypeScript & React.**

---

<p align="center">
    <img src="https://github.com/naol728/Atomix/blob/main/atomixlogo.jpeg?raw=true" alt="Atomix Logo" width="120" />
</p>

<p align="center">
    <b>Simple API. Tiny footprint. Powerful reactivity.</b>
</p>

---

## ✨ Packages

- [`atomix-core`](./core) — <sub>Framework-agnostic state management logic</sub>
- [`atomix-react`](./react) — <sub>React bindings built on <code>useSyncExternalStore</code></sub>

---

## 🚀 Features

- ⚡ **Zustand-style** `setState` & `getState`
- 🎯 **Selector-based** subscriptions
- 🪶 **Minimal** & **fast**
- ⚛️ **React** support via `useStore`
- 🧑‍💻 **Modern TypeScript** codebase

---

## 📦 Installation

**Core only (vanilla TypeScript or other frameworks):**

```bash
npm install atomix-core
```

**With React:**

```bash
npm install atomix-core atomix-react
```

---

## 🔧 Quick Start

### 1. Vanilla TypeScript

```typescript
import { createStore } from "atomix-core";

interface State {
  counter: number;
}

const store = createStore<State, {}>({ counter: 0 });

// Subscribe to changes
store.subscribe(
  (state) => state.counter,
  (counter) => {
    console.log("Counter updated:", counter);
  }
);

// Update the state
store.setState((prev) => ({ counter: prev.counter + 1 }));
```

---

### 2. With React

<details>
<summary><b>counterStore.ts</b></summary>

```typescript
import { createStore } from "atomix-core";

export const counterStore = createStore({ count: 0 });
```

</details>

<details>
<summary><b>App.tsx</b></summary>

```tsx
import { useStore } from "atomix-react";
import { counterStore } from "./counterStore";

export default function Counter() {
  const count = useStore(counterStore, (state) => state.count);

  return (
    <div>
      <h2>{count}</h2>
      <button
        onClick={() => counterStore.setState((s) => ({ count: s.count + 1 }))}
      >
        Increment
      </button>
    </div>
  );
}
```

</details>

---

## 🧠 API Reference

### `createStore(initialState, actions?)`

Creates a new store.

- **initialState**: Your default state object
- **actions**: _(optional)_ A function that receives a set function and returns custom actions

**Returns:**

```typescript
{
    getState,
    setState,
    subscribe,
    ...yourCustomActions
}

```

---

## 📁 Project Structure

```text
Atomix/
├── core/         # atomix-core (core logic)
├── react/        # atomix-react (React integration)
├── test-app/     # Example Vite+React app for local testing
├── package.json
├── README.md
└── tsconfig.json
```

---

## 📝 License

MIT © 2025 Naol Meseret

---

## 💬 Contributing

_Contributing guide coming soon!_  
For now, feel free to **fork**, **test**, and **suggest features** or improvements via issues.  
If you find Atomix useful, please ⭐️ the repo — it helps others discover the project!

---
