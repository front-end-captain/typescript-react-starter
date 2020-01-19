/* eslint-disable no-param-reassign */
import { Store } from "@/library/store";

type ListItem = { name: string };

const counterStore = new Store({
  name: "counter",
  state: {
    count: 10,
    times: 100,
    visible: false,
    list: [] as Array<ListItem>,
  },
  reducers: {
    init: (state, payload: Array<ListItem>) => {
      state.list = payload;
    },
    increment: (state, payload: number) => {
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
    toggleVisible: (state, payload: boolean) => {
      state.visible = payload;
    },
  },
  effects: {
    asyncIncrement: async (payload: number) => {
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
