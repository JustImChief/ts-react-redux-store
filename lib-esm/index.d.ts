import { Store } from 'redux';
import { default as Reducer, types } from './Reducer';
declare let store: Store<any, import("redux").AnyAction>;
declare let connectReducers: (...reducersOrFormName: any[]) => import("react-redux").InferableComponentEnhancerWithProps<any, {}>;
declare let dispatch: import("redux").Dispatch<import("redux").AnyAction>;
declare let getState: (reducer: any) => {
    [p: string]: any;
};
declare let registerReducer: (Reducer: any) => void;
declare let unregisterReducer: (Reducer: any) => void;
export declare const ssr: (data: any[]) => void;
export default store;
export { connectReducers, dispatch, getState, registerReducer, unregisterReducer };
export { Reducer, types };
