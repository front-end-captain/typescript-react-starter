import { useState, useEffect } from "react";

import { produce } from "immer";
import { Modal, Reducers, Effects, Updater, Update, Selector, ActionSelector, StoreConfig } from "./types";
import { getActionName } from "./helps";

const dev: boolean = process.env.NODE_ENV === "development";

class Store<S, R extends Reducers<S>, E extends Effects> {
  private store: S;

  private updaters: Array<Updater<S>> = [];

  private modal: Modal<S, R, E>;

  private static config: StoreConfig = { debug: dev };

  static setConfig(config: StoreConfig) {
    Store.config.debug = config.debug || dev;
  }

  constructor(modal: Modal<S, R, E>) {
    this.store = modal.state;
    this.modal = modal;

    if (dev) {
      this.checkModal(modal);
    }
  }

  private checkModal(modal: Modal<S, R, E>): void {
    const modalName = modal.name || "unknown";
    if (typeof modal.reducers !== "object") {
      throw new Error(`It looks like the reducers is not a plain object of your store named ${modalName}`);
    }
    if (typeof modal.effects !== "object") {
      throw new Error(`It looks like the effects is not a plain object of your store named ${modalName}`);
    }

    Object.keys(modal.reducers).forEach((reducerName) => {
      if (typeof modal.reducers[reducerName] !== "function") {
        throw new Error(`It looks like the ${modalName}.reducer: ${reducerName} is not a Function, please check it`);
      }
    });

    Object.keys(modal.effects).forEach((effectName) => {
      if (typeof modal.effects[effectName] !== "function") {
        throw new Error(`It looks like the ${modalName}.effect: ${effectName} is not a Function, please check it`);
      }
    });
  }

  // TODO set a default selector
  public useStore<P>(selector: Selector<S, P>): P {
    const [state, setState] = useState(this.store);

    const update: Update<S> = (set: any, nextStore: S) => {
      if (!nextStore) {
        return;
      }

      this.store = nextStore;

      set(() => nextStore);
    };

    const updater: Updater<S> = {
      update,
      set: setState,
    };

    useEffect(() => {
      this.updaters.push(updater);
      return () => {
        this.updaters.splice(this.updaters.indexOf(updater), 1);
      };
    }, []);

    return selector(state);
  }

  public dispatch<K extends any>(action: keyof (R & E) | ActionSelector<R, E>, payload?: K): void {
    const actionName = getActionName(action);

    if (this.modal.effects && this.modal.effects[actionName]) {
      this.modal.effects[actionName](payload);
      return;
    }

    if (!this.updaters.length) {
      return;
    }

    // update store
    const nextStore: S = produce(this.store, (draftState: S) => {
      this.modal.reducers[actionName](draftState, payload);
    });

    if (Store.config.debug) {
      console.group(`Store: ${this.modal.name || "unknown"}`);
      console.log("%cPrev", "color: orange; font-size: 18px", this.store);
      console.log("%cNext", "color: red; font-size: 18px", nextStore);
      console.groupEnd();
    }

    // update view
    this.updaters.forEach((updater) => {
      if (typeof this.modal.reducers[actionName] === "function") {
        updater.update(updater.set, nextStore);
      }
    });
  }

  public getState(): S {
    return this.store;
  }
}

export { Store };
