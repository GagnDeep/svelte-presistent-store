import { writable } from "svelte/store";

class PresistentWritable {
  constructor(key, initialState) {
    this.store = writable(initialState);
    this.key = key;
    this.initialState = initialState;

    try {
      let data = localStorage.getItem(key);

      if (data) {
        const parsedData = JSON.parse(data);
        this.store.set(parsedData);
      } else {
        const string = JSON.stringify(initialState);
        localStorage.setItem(key, string);
      }
    } catch (err) {
      console.error(err);
    }
  }

  subscribe(...args) {
    return this.store.subscribe(...args);
  }

  update(...args) {
    return this.store.update(...args);
  }

  set(...args) {
    this.storeData(args[0]);
    return this.store.set(...args);
  }
  storeData(data) {
    if (!data) return;
    let string = JSON.stringify(data);
    localStorage.setItem(this.key, string);
  }
}

export default PresistentWritable;
