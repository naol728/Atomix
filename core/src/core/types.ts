export type Selector<T, U> = (state: T) => U;
export type Listener<U> = (selectedValue: U) => void;
export type Subscription<T> = {
  selector: Selector<T, any>;
  listener: Listener<any>;
  lastSelectedValue: any;
};

export type CallBack = () => void;
