/*  
 used observer pattern to notify the subscribers
*/

import { Selector } from "./types";
import { CallBack } from "./types";
import { Subscription } from "./types";
import { Listener } from "./types";

/* 

STATE: represents the structure of th user will store as an inital state 
ACTION: represents the actions that will change the state value 

*/
export function createStore<STATE, ACTION>(
  initalstate: STATE,
  actions: (
    set: (updater: Partial<STATE> | ((prev: STATE) => Partial<STATE>)) => void
  ) => ACTION
) {
  let state: STATE = initalstate;

  /* 
 it stores the selector with the listeners and also the lastselected value 
 
 selector:to let know the listeners which state value is changed to notify for listeners
 listensers:which stores the listener for an state change events 
 lastSelectedValue:which stores the state lastvalue or the previous state value 
  
  */

  const subscriptions: Subscription<STATE>[] = [];

  /* 
  it is used to subscribe the state into the state change 
  and it stores the selector with the listenr to the subscriptions

  when new state is created each state is subscibe to the state change
  and create listener for each state 
  
  and also it returns the unsubscribe to unsubscribe all state changes it is called when the render is unmounted
  
  */

  const subscribe = <U>(
    selector: Selector<STATE, U>,
    listener: Listener<U>
  ): CallBack => {
    // this gets the selected state value and it will be stored in lastselectedvalue
    const selectedValue = selector(state);

    const subscription: Subscription<STATE> = {
      selector,
      listener,
      lastSelectedValue: selectedValue,
    };
    /*
     then we are pushing the subscription to the subscription to notify when the state is changed the comparation and the the notificattion is done in the notify
     */
    subscriptions.push(subscription);
    /* 
it is used to unsubscribe to the events change it unsubscribes to a single state 
and it should be called to unsubsctibe the state chnage 
*/
    return () => {
      const index = subscriptions.indexOf(subscription);
      if (index !== -1) subscriptions.splice(index, 1);
    };
  };

  /* 

  notify is called when the state changed and it takes the newState and it finds the newstate from the subscriptions and it compares the compares the current value and the previous value if the value is changed it called the listener and store the newstate to the lasteselected value then update all the statevalue with the newstate

  and it compares for each subscriptions and only notify that the subscription chnaged value 
  
  */
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

  /* 
  
  ths changes the state directly without specfing the actions 
  
  if the action is passed as an argment and it will be called the setstate
  */
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

  /* 
  
   this is the function to get the state of the current state values 

  */

  const getState = () => {
    return state;
  };

  return {
    subscribe,
    setState,
    getState,
    ...actions(setState),
  };
}

/* 

example of usage 
*/

// interface state {
//   counter: number;
//   name: string;
// }
// interface action {
//   increament: () => void;
// }
// const store = createStore<state, action>({ counter: 0, name: "" }, (set) => ({
//   increament: () => set((prev: state) => ({ counter: prev.counter + 1 })),
// }));

// store.increament();

// store.subscribe(
//   (state) => state.counter,
//   (counter) => console.log("counter changed ", counter)
// );
// store.subscribe(
//   (state) => state.name,
//   (name) => console.log("name changed", name)
// );
// store.setState((state) => ({ counter: state.counter + 1 }));
// store.setState({ counter: 8 });

// interface Action {
//   changeName: (newname: string) => void;
// }
// const store2 = createStore<{ name: string }, Action>({ name: "" }, (set) => ({
//   changeName: (newname) => set(() => ({ name: newname })),
// }));

// const unsubscribe = store2.subscribe(
//   (name) => name,
//   (name) => console.log("name is changed to", name)
// );

// store2.changeName("naol");
// store2.setState(() => ({ name: "alemitu" }));
