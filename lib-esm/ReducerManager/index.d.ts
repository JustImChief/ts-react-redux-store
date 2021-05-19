import { AnyAction, CombinedState, Reducer, ReducersMapObject } from 'redux';
declare class ReducerManager {
    private readonly reducer;
    private combineReducers;
    private keysToRemove;
    constructor(reducers?: ReducersMapObject);
    add(key: string, reducer: Reducer): Reducer<CombinedState<unknown>>;
    getReducerMap(): ReducersMapObject;
    reduce(state: CombinedState<{}> | undefined, action: AnyAction): CombinedState<{}>;
    remove(key: string): Reducer<CombinedState<unknown>>;
}
export default ReducerManager;
