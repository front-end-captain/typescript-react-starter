import React from "react";
import { Modal } from "antd";

import { counterStore } from "@/model/counter";

const Counter = () => {
  const { count, times, visible } = counterStore.useStore((S) => S);

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

      <Modal
        visible={visible}
        onCancel={() => counterStore.dispatch((A) => A.toggleVisible, false)}
        onOk={() => counterStore.dispatch((A) => A.toggleVisible, false)}
      >
        this is a modal
      </Modal>
    </div>
  );
};

export { Counter };
