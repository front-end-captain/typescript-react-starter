import React from "react";

import { counterStore } from "@/model/counter";

const Counter = () => {
  const count = counterStore.useStore((S) => S.count);
  const times = counterStore.useStore((S) => S.times);

  return (
    <div>
      <h2>Counter</h2>
      <span>Count: {count}</span>
      <br />
      <span>Times: {times}</span>
      <br />
      <button type="button" onClick={() => counterStore.dispatch((R) => R.decrement)}>
        -
      </button>
      <button type="button" onClick={() => counterStore.dispatch((A) => A.increment)}>
        +
      </button>
      <button type="button" onClick={() => counterStore.dispatch((A) => A.asyncIncrement, 10)}>
        async+
      </button>
      <button type="button" onClick={() => counterStore.dispatch((A) => A.toggleVisible, true)}>
        toggle
      </button>
    </div>
  );
};

export { Counter };
