import { AnyAction, CombinedState, Reducer as ReduxReducer } from 'redux';
declare const types: {
    array: string;
    bool: string;
    number: string;
    object: string;
    string: string;
};
declare class Reducer {
    static _name: string;
    static get initialState(): InitialStateType & {
        initialStateLoaded?: boolean;
        loading?: boolean;
        wait?: boolean;
    } & {
        initialStateLoaded?: boolean;
        loading?: boolean;
        wait?: boolean;
    };
    actions: {
        [p: string]: (state: CombinedState<{}>, action: AnyAction) => CombinedState<{}>;
    };
    DT: {
        toArray: typeof import("ts-data-transformer/lib-esm/toArray").default;
        toBoolean: typeof import("ts-data-transformer/lib-esm/toBoolean").default;
        toDate: typeof import("ts-data-transformer/lib-esm/toDate").default;
        toInteger: typeof import("ts-data-transformer/lib-esm/toInteger").default;
        toJSON: typeof import("ts-data-transformer/lib-esm/toJSON").default;
        toNumber: typeof import("ts-data-transformer/lib-esm/toNumber").default;
        toObject: typeof import("ts-data-transformer/lib-esm/toObject").default;
        toString: typeof import("ts-data-transformer/lib-esm/toString").default;
        toText: typeof import("ts-data-transformer/lib-esm/toText").default;
    };
    DV: {
        compare: typeof import("ts-data-validator/lib/compare").default;
        isArray: typeof import("ts-data-validator/lib/isArray").default;
        isBlob: typeof import("ts-data-validator/lib/isBlob").default;
        isBoolean: typeof import("ts-data-validator/lib/isBoolean").default;
        isDate: typeof import("ts-data-validator/lib/isDate").default;
        isDecimal: typeof import("ts-data-validator/lib/isDecimal").default;
        isEvent: typeof import("ts-data-validator/lib/isEvent").default;
        isFile: typeof import("ts-data-validator/lib/isFile").default;
        isFunction: typeof import("ts-data-validator/lib/isFunction").default;
        isInteger: typeof import("ts-data-validator/lib/isInteger").default;
        isJSON: typeof import("ts-data-validator/lib/isJSON").default;
        isNaN: typeof import("ts-data-validator/lib/isNaN").default;
        isNotEmptyArray: typeof import("ts-data-validator/lib/isNotEmptyArray").default;
        isNotEmptyObject: typeof import("ts-data-validator/lib/isNotEmptyObject").default;
        isNotEmptyString: typeof import("ts-data-validator/lib/isNotEmptyString").default;
        isNull: typeof import("ts-data-validator/lib/isNull").default;
        isNumber: typeof import("ts-data-validator/lib/isNumber").default;
        isObject: typeof import("ts-data-validator/lib/isObject").default;
        isRegExp: typeof import("ts-data-validator/lib/isRegExp").default;
        isString: typeof import("ts-data-validator/lib/isString").default;
        isUndefined: typeof import("ts-data-validator/lib/isUndefined").default;
    };
    initialData: {};
    initialValues: {};
    initialState: StateType & {
        initialStateLoaded?: boolean;
        loading?: boolean;
        wait?: boolean;
    };
    protected constructor(initialState?: InitialStateType);
    protected init(): ReduxReducer;
    protected reducer(): ReduxReducer;
    protected prepareValues(initial: {
        [p: string]: any;
    }, values?: {
        [p: string]: any;
    }): {
        [p: string]: any;
    };
    protected getValue(valueType: [string, any] | {
        [p: string]: any;
    } | string, value?: any): any[] | boolean | null | number | {
        [p: string]: any;
    } | string;
    protected failure(state: CombinedState<{}>, action: AnyAction, wait?: boolean): CombinedState<{}>;
    protected request(state: CombinedState<{}>, action: AnyAction, wait?: boolean): CombinedState<{}>;
    protected success(state: CombinedState<{}>, action: AnyAction, wait?: boolean): CombinedState<{}>;
}
export default Reducer;
export declare type InitialStateType = {
    data?: {
        [p: string]: any;
    };
    values?: {
        [p: string]: any;
    };
};
export declare type StateType = InitialStateType & {
    initialStateLoaded?: boolean;
    loading?: boolean;
    wait?: boolean;
};
export { types };
