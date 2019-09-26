export interface Modal<S, R, E> {
  name: string;
  state: S;
  reducers: R;
  effects: E;
}

export type Reducer<S> = (state: S, payload: any) => S | void;

export type Reducers<S> = {
  [key: string]: Reducer<S>;
};

export type Effect = (payload: any) => any;

export type Effects = {
  [key: string]: Effect;
};

export type Update<S> = (set: any, store: S) => void;

export interface Updater<S> {
  update: Update<S>;
  set: any;
}

export type Selector<S, P> = (state: S) => P;

export type ActionSelector<R, E> = (action: R & E) => any;

export type StoreConfig = { debug?: boolean };
