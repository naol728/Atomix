/* A selector is a function that takes the whole state (T )(it is the interface that the cureent state will have ) and returns any derived value from that state (U)(which one part we will react it is dynamic if the state is {counter:0 } then it will be state.counter) 

*/
export type Selector<T, U> = (state: T) => U;
/* 
callback function that take the new selected value and run whenever the value changed 
*/
export type Listener<U> = (selectedValue: U) => void;

/* 
it is an object that trackes the 1 selector  1 listener and also the the previous value of the state 

selector:Extracts a piece of state,
listener:Called when the selected value changes,
lastSelectedValueL:Stores the last value to compare for changes


Keeps track of:

What the subscriber cares about (selector)

What should happen if that value changes (listener)

What value they last received (lastSelectedValue)
*/
export type Subscription<T> = {
  selector: Selector<T, any>;
  listener: Listener<any>;
  lastSelectedValue: any;
};
/* for callback funtion that retuns nothing  */
export type CallBack = () => void;
