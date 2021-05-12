import { Dispatch, Store } from 'redux';
import { default as Reducer } from '../Reducer';
declare const store: Store;
declare const dispatch: Dispatch;
declare function getState(reducer: string): {
    [p: string]: any;
};
declare function registerReducer(Reducer: any, initialState?: {
    [p: string]: any;
}): void;
declare function unregisterReducer(Reducer: any): void;
declare function connectReducers(...reducersOrFormName: ((typeof Reducer) | string)[]): import("react-redux").InferableComponentEnhancerWithProps<{
    [p: string]: any;
} & {
    formValues?: {
        [p: string]: any;
    };
} & import("react-redux").DispatchProp<import("redux").AnyAction>, {}>;
export default store;
export { connectReducers, dispatch, getState, Reducer, registerReducer, unregisterReducer };
export { types } from '../Reducer';
export type { InitialStateType, StateType } from '../Reducer';
