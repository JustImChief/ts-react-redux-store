var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getFormValues, reducer as form } from 'redux-form';
import { connect } from 'react-redux';
import { isFunction, isString } from 'ts-data-validator';
import ReducerManager from './ReducerManager';
import { default as Reducer, types } from './Reducer';
var ReduxStore = /** @class */ (function () {
    function ReduxStore() {
        this.middleware = process.env.NODE_ENV === 'production'
            ? applyMiddleware(thunkMiddleware)
            : composeWithDevTools(applyMiddleware(thunkMiddleware));
        this.connectReducers = this.connectReducers.bind(this);
        this.getState = this.getState.bind(this);
        this.registerReducer = this.registerReducer.bind(this);
        this.ssr = this.ssr.bind(this);
        this.unregisterReducer = this.unregisterReducer.bind(this);
        this.reducerManager = new ReducerManager({ form: form });
        this.store = createStore(this.reducerManager.reduce, this.middleware);
    }
    Object.defineProperty(ReduxStore.prototype, "dispatch", {
        get: function () {
            return this.store.dispatch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReduxStore.prototype, "reducerManager", {
        get: function () {
            return this.manager;
        },
        set: function (reducerManager) {
            this.manager = reducerManager;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReduxStore.prototype, "store", {
        get: function () {
            return this.storage;
        },
        set: function (storage) {
            this.storage = storage;
        },
        enumerable: false,
        configurable: true
    });
    ReduxStore.prototype.connectReducers = function () {
        var _this = this;
        var reducersOrFormName = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            reducersOrFormName[_i] = arguments[_i];
        }
        var _a = reducersOrFormName.reduce(function (accumulator, currentValue) {
            if (isFunction(currentValue)) {
                _this.registerReducer(currentValue);
                accumulator.reducers.push(currentValue);
            }
            else if (isString(currentValue)) {
                accumulator.formName = currentValue;
            }
            return accumulator;
        }, { reducers: [] }), reducers = _a.reducers, formName = _a.formName;
        return connect(function (state) {
            var props = reducers.reduce(function (accumulator, currentValue) {
                var _a;
                return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue._name] = state[currentValue._name] || {}, _a)));
            }, {});
            if (isString(formName)) {
                props.formValues = getFormValues(formName)(state) || {};
            }
            return props;
        });
    };
    ReduxStore.prototype.getState = function (reducer) {
        var state = this.store.getState();
        return state[reducer] || {};
    };
    ReduxStore.prototype.registerReducer = function (Reducer) {
        this.store.replaceReducer(this.reducerManager.add(Reducer._name, new Reducer().init()));
    };
    ReduxStore.prototype.ssr = function (Reducer, initial) {
        if (initial === void 0) { initial = {}; }
        this.registerReducer(Reducer);
        this.dispatch(__assign({ type: "@" + Reducer._name + "/SSR_INITIALIZE" }, initial));
    };
    ReduxStore.prototype.unregisterReducer = function (Reducer) {
        this.store.replaceReducer(this.reducerManager.remove(isString(Reducer) ? Reducer : Reducer._name));
    };
    return ReduxStore;
}());
var _a = new ReduxStore(), connectReducers = _a.connectReducers, dispatch = _a.dispatch, getState = _a.getState, registerReducer = _a.registerReducer, ssr = _a.ssr, store = _a.store, unregisterReducer = _a.unregisterReducer;
export default store;
export { connectReducers, dispatch, getState, registerReducer, ssr, unregisterReducer };
export { Reducer, types };
//# sourceMappingURL=index.js.map