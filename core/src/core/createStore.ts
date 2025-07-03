import { Selector } from "./types";
import { CallBack } from "./types";
import { Subscription } from "./types";
import { Listener } from "./types";

export function createStore<STATE, ACTION>(
  initalstate: STATE,
  actions?: (set: Partial<STATE> | ((prev: STATE) => Partial<STATE>)) => ACTION
) {
  let state: STATE = initalstate;

  const subscriptions: Subscription<STATE>[] = [];

  const subscribe = <U>(
    selector: Selector<STATE, U>,
    listener: Listener<U>
  ): CallBack => {
    const selectedValue = selector(state);
    console.log(selectedValue);
    const subscription: Subscription<STATE> = {
      selector,
      listener,
      lastSelectedValue: selectedValue,
    };
    console.log(subscription);
    subscriptions.push(subscription);

    return () => {
      const index = subscriptions.indexOf(subscription);
      if (index !== -1) subscriptions.splice(index, 1);
    };
  };
  const notify = (newState: STATE) => {
    for (const sub of subscriptions) {
      const nextSelected = sub.selector(newState);

      if (nextSelected !== sub.lastSelectedValue) {
        sub.lastSelectedValue = nextSelected;
        sub.listener(nextSelected);
      }
    }

    state = newState;
  };

  const setState = (
    updater: Partial<STATE> | ((prev: STATE) => Partial<STATE>)
  ) => {
    const nextState = typeof updater === "function" ? updater(state) : updater;
    const newState = { ...state, ...nextState };
    if (newState !== state) {
      state = newState;
      notify(state);
    }
  };

  const getState = () => {
    return state;
  };
  return {
    subscribe,
    notify,
    setState,
    getState,
    ...actions,
  };
}

interface state {
  counter: number;
  name: string;
}
interface action {
  addcount: Partial<state>;
}

const store = createStore<state, action>({ counter: 0, name: "" });
store.subscribe(
  (state) => state.counter,
  (counter) => console.log("counter changed ", counter)
);
store.subscribe(
  (state) => state.name,
  (name) => console.log("name changed", name)
);
store.setState((state) => ({ counter: state.counter + 1 }));
