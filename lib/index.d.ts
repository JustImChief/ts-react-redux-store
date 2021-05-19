import { Store } from 'redux';
import { default as Reducer, types } from './Reducer';
declare let store: Store<any, import("redux").AnyAction>;
export default store;
export declare let connectReducers: (...reducersOrFormName: any[]) => import("react-redux").InferableComponentEnhancerWithProps<any, {}>;
export declare let dispatch: import("redux").Dispatch<import("redux").AnyAction>;
export declare let getState: (reducer: any) => {
    [p: string]: any;
};
export declare let registerReducer: (Reducer: any) => void;
export declare let ssr: (data: any[]) => Store<any, import("redux").AnyAction>;
export declare let unregisterReducer: (Reducer: any) => void;
export { Reducer, types };
