import thunkMiddleware                         from 'redux-thunk';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools }                 from 'redux-devtools-extension';
import { getFormValues, reducer as form }      from 'redux-form';
import { connect }                             from 'react-redux';
import { isFunction, isString }                from 'ts-data-validator';

import ReducerManager                from './ReducerManager';
import { default as Reducer, types } from './Reducer';

class ReduxStore {
  manager: ReducerManager;
  middleware = process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));
  storage: Store;

  constructor(data: any[] = []) {
    this.connectReducers   = this.connectReducers.bind(this);
    this.getState          = this.getState.bind(this);
    this.registerReducer   = this.registerReducer.bind(this);
    this.unregisterReducer = this.unregisterReducer.bind(this);

    if (data.length > 0) {
      const {reducers, initialState} = data.reduce((accumulator, currentValue) => {
        const [Reducer, initial] = currentValue;

        return {
          reducers:     {
            ...accumulator.reducers,
            [Reducer._name]: new Reducer().init(),
          },
          initialState: {
            ...accumulator.initialState,
            [Reducer._name]: initial,
          },
        };
      }, {reducers: {}, initialState: {}});

      this.reducerManager = new ReducerManager({form, ...reducers});
      this.store          = createStore(this.reducerManager.reduce, initialState, this.middleware);
    } else {
      this.reducerManager = new ReducerManager({form});
      this.store          = createStore(this.reducerManager.reduce, this.middleware);
    }
  }

  get dispatch() {
    return this.store.dispatch;
  }

  get reducerManager() {
    return this.manager;
  }

  get store() {
    return this.storage;
  }

  set reducerManager(reducerManager) {
    this.manager = reducerManager;
  }

  set store(storage) {
    this.storage = storage;
  }

  connectReducers(...reducersOrFormName) {
    const {reducers, formName} = reducersOrFormName.reduce((accumulator, currentValue) => {
      if (isFunction(currentValue)) {
        this.registerReducer(currentValue);

        accumulator.reducers.push(currentValue);
      } else if (isString(currentValue)) {
        accumulator.formName = currentValue;
      }

      return accumulator;
    }, {reducers: []});

    return connect((state) => {
      const props = reducers.reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue._name]: state[currentValue._name] || {},
      }), {});

      if (isString(formName)) {
        props.formValues = getFormValues(formName)(state) || {};
      }

      return props;
    });
  }

  getState(reducer): {[p: string]: any} {
    const state = this.store.getState();

    return state[reducer] || {};
  }

  registerReducer(Reducer) {
    this.store.replaceReducer(this.reducerManager.add(Reducer._name, new Reducer().init()));
  }

  unregisterReducer(Reducer) {
    this.store.replaceReducer(this.reducerManager.remove(isString(Reducer) ? Reducer : Reducer._name));
  }
}

const storage = new ReduxStore();

let store             = storage.store;
let connectReducers   = storage.connectReducers;
let dispatch          = storage.dispatch;
let getState          = storage.getState;
let registerReducer   = storage.registerReducer;
let unregisterReducer = storage.unregisterReducer;

export const ssr = (data: any[]) => {
  const storage = new ReduxStore(data);

  store             = storage.store;
  connectReducers   = storage.connectReducers;
  dispatch          = storage.dispatch;
  getState          = storage.getState;
  registerReducer   = storage.registerReducer;
  unregisterReducer = storage.unregisterReducer;
};

export default store;
export { connectReducers, dispatch, getState, registerReducer, unregisterReducer };
export { Reducer, types };