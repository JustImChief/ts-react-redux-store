import { AnyAction, CombinedState, combineReducers, Reducer, ReducersMapObject } from 'redux';

class ReducerManager {
  private readonly reducer: ReducersMapObject;
  private combineReducers: Reducer<CombinedState<unknown>>;
  private keysToRemove: string[];

  constructor(reducers: ReducersMapObject = {}) {
    this.reducer         = {...reducers};
    this.combineReducers = combineReducers(this.reducer);
    this.keysToRemove    = [];
  }

  add(key: string, reducer: Reducer): Reducer<CombinedState<unknown>> {
    if ((key && !this.reducer.hasOwnProperty(key))) {
      this.reducer[key]    = reducer;
      this.combineReducers = combineReducers(this.reducer);
    }

    return this.combineReducers;
  }

  getReducerMap(): ReducersMapObject {
    return this.reducer;
  }

  reduce(state: CombinedState<{}> | undefined, action: AnyAction): CombinedState<{}> {
    const newState = {...state};

    if (this.keysToRemove.length > 0) {
      for (let key of this.keysToRemove) {
        delete newState[key];
      }

      this.keysToRemove = [];
    }

    return this.combineReducers(newState, action);
  }

  remove(key: string): Reducer<CombinedState<unknown>> {
    if (key && this.reducer.hasOwnProperty(key)) {
      delete this.reducer[key];

      this.keysToRemove.push(key);

      this.combineReducers = combineReducers(this.reducer);
    }

    return this.combineReducers;
  };
}

export default ReducerManager;