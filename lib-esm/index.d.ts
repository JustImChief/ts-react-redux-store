import { Store } from 'redux';
import { default as Reducer, types } from './Reducer';
declare const connectReducers: (...reducersOrFormName: any[]) => import("react-redux").InferableComponentEnhancerWithProps<any, {}>, dispatch: import("redux").Dispatch<import("redux").AnyAction>, getState: (reducer: any) => {
    [p: string]: any;
}, registerReducer: (Reducer: any) => this, ssr: (Reducer: any, initial?: {
    [p: string]: any;
}) => void, store: Store<any, import("redux").AnyAction>, unregisterReducer: (Reducer: any) => void;
export default store;
export { connectReducers, dispatch, getState, registerReducer, ssr, unregisterReducer };
export { Reducer, types };
