interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;

  message = "hello!";

  delay(input: Promise<number>): Promise<Action<string>> {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: "delay",
    }));
  }

  setMessage(action: Action<Date>): Action<number> {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    };
  }
}

type PickMethods<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];

type EffectModuleMethods = PickMethods<EffectModule>;

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

type asyncMethod<V, U> = (input: Promise<V>) => Promise<Action<U>>;
type asyncMethodConnected<V, U> = (input: V) => Action<U>;

type syncMethod<V, U> = (input: Action<V>) => Action<U>;
type syncMethodConnected<V, U> = (input: V) => Action<U>;

type MethodsConnect<T> = T extends asyncMethod<infer V, infer U>
  ? asyncMethodConnected<V, U>
  : T extends syncMethod<infer V, infer U>
  ? syncMethodConnected<V, U>
  : never;

type Connect = (
  m: EffectModule,
) => {
  [M in EffectModuleMethods]: MethodsConnect<EffectModule[M]>;
};

const connect: Connect = () => {
  return {
    delay: (input: number) => {
      return {
        type: "DELAY",
        payload: `delay ${input}`,
      };
    },
    setMessage: (input: Date) => {
      return {
        type: "SET_MESSAGE",
        payload: input.getMilliseconds(),
      };
    },
  };
};

export const connected: Connected = connect(new EffectModule());
