export function createStore(initalstate) {
  let states = initalstate;
  const listeners = new Set();

  let selector = "name";

  const subscribe = (listener) => {
    listeners.add(listener);
  };

  const notify = (newState) => {
    if (newState[selector]) {
      console.log(newState);
    } else {
      console.log("Unkown state is changed");
    }
  };

  const setState = () => {
    actions();
    notify(states);
  };
  const getState = () => {
    return states;
  };
  return {
    subscribe,
    notify,
    setState,
    getState,
  };
}

const store = createStore({ name: "naol" });
store.setState({ name: "abebe" });

const states = store.getState();
console.log(states);
