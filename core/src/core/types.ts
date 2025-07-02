export type SetState<T> =
  | Partial<T>
  | ((prev: T) => Partial<T>);

export type Store<T, A> = {
  getState(): T;
  subscribe(listener: (state: T) => void): () => void;
} & {
  [K in keyof A]: A[K];
};
