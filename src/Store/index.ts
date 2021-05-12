import thunkMiddleware                                   from 'redux-thunk';
import { applyMiddleware, createStore, Dispatch, Store } from 'redux';
import { composeWithDevTools }                           from 'redux-devtools-extension';
import { getFormValues, reducer as form }                from 'redux-form';
import { connect }                                       from 'react-redux';
import { isString }                                      from 'ts-data-validator';

import { default as Reducer }               from '../Reducer';
import { default as ReducerManager }        from '../ReducerManager';

const reducerManager = new ReducerManager({form});
const middleware     = process.env.NODE_ENV === 'production'
  ? applyMiddleware(thunkMiddleware)
  : composeWithDevTools(applyMiddleware(thunkMiddleware));

function createStorage(): Store {
  return createStore(reducerManager.reduce, middleware);
}

const store: Store       = createStorage();
const dispatch: Dispatch = store.dispatch;

function getState(reducer: string): {[p: string]: any} {
  const state = store.getState();

  return state[reducer] || {};
}

function registerReducer(Reducer, initialState: {[p: string]: any} = {}) {
  store.replaceReducer(reducerManager.add(Reducer._name, new Reducer().ssr(initialState), true));
}

function unregisterReducer(Reducer) {
  store.replaceReducer(reducerManager.remove(isString(Reducer) ? Reducer : Reducer._name));
}

function connectReducers(...reducersOrFormName: ((typeof Reducer) | string)[]) {
  const {reducers, formName} = reducersOrFormName
    .reduce((accumulator: {reducers: (typeof Reducer)[], formName?: string}, currentValue: (typeof Reducer) | string) => {
      if (typeof currentValue === 'string') {
        accumulator.formName = currentValue;
      } else {
        registerReducer(currentValue);

        accumulator.reducers.push(currentValue);
      }

      return accumulator;
    }, {reducers: []});

  function mapStateToProps(state): {[p: string]: any} & {formValues?: {[p: string]: any}} {
    const props = reducers.reduce((accumulator: {[p: string]: any} & {formValues?: {[p: string]: any}}, currentValue) => ({
      ...accumulator,
      [currentValue._name]: state[currentValue._name] || {},
    }), {});

    if (isString(formName)) {
      props.formValues = getFormValues(formName)(state) || {};
    }

    return {...props};
  }

  return connect(mapStateToProps);
}

export default store;
export { connectReducers, dispatch, getState, Reducer, registerReducer, unregisterReducer };
export { types }                            from '../Reducer';
export type { InitialStateType, StateType } from '../Reducer';