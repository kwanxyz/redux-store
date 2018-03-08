export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
    this.subscribers = [];
  }

  // typescript get property
  // store.value
  get value() {
    return this.state;
  }

  subscribe(fn) {
    console.log('we sbuscribed');
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    // for unsubscribe
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  dispatch(action) {
    // this.state = {
    // merge in the current state into the new state
    // ...this.state,
    // todos: [...this.state.todos, action.payload]
    // };
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  private reduce(state, action) {
    const newState = {};
    // key in the reducers
    for (const prop in this.reducers) {
      // newstate.todos = this.reducers.todos(state, action)  is the same as below
      // each reducer manages it's own state, so that's why you need to do state[prop]
      // otherwise you end up passing the entire state
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
