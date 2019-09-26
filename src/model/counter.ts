/* eslint-disable no-param-reassign */
import { Store } from "@/library/store";

const counterStore = new Store({
  name: "counter",
  state: {
    count: 10,
    times: 100,
    visible: false,
    list: [],
  },
  reducers: {
    init: (state, payload) => {
      state.list = payload;
    },
    increment: (state, payload) => {
      if (payload) {
        state.count += payload;
        return;
      }

      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    addTimes: (state) => {
      state.times += 100;
    },
    toggleVisible: (state, payload) => {
      state.visible = payload as boolean;
    },
  },
  effects: {
    asyncIncrement: async (payload) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      counterStore.dispatch((A) => A.increment, payload);
    },
  },
});

export { counterStore };
