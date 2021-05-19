"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.Reducer = exports.unregisterReducer = exports.ssr = exports.registerReducer = exports.getState = exports.dispatch = exports.connectReducers = void 0;
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_form_1 = require("redux-form");
var react_redux_1 = require("react-redux");
var ts_data_validator_1 = require("ts-data-validator");
var ReducerManager_1 = require("./ReducerManager");
var Reducer_1 = require("./Reducer");
Object.defineProperty(exports, "Reducer", { enumerable: true, get: function () { return Reducer_1.default; } });
Object.defineProperty(exports, "types", { enumerable: true, get: function () { return Reducer_1.types; } });
var ReduxStore = /** @class */ (function () {
    function ReduxStore() {
        this.middleware = process.env.NODE_ENV === 'production'
            ? redux_1.applyMiddleware(redux_thunk_1.default)
            : redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default));
        this.connectReducers = this.connectReducers.bind(this);
        this.getState = this.getState.bind(this);
        this.registerReducer = this.registerReducer.bind(this);
        this.ssr = this.ssr.bind(this);
        this.unregisterReducer = this.unregisterReducer.bind(this);
        this.reducerManager = new ReducerManager_1.default({ form: redux_form_1.reducer });
        this.store = redux_1.createStore(this.reducerManager.reduce, this.middleware);
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
            if (ts_data_validator_1.isFunction(currentValue)) {
                _this.registerReducer(currentValue);
                accumulator.reducers.push(currentValue);
            }
            else if (ts_data_validator_1.isString(currentValue)) {
                accumulator.formName = currentValue;
            }
            return accumulator;
        }, { reducers: [] }), reducers = _a.reducers, formName = _a.formName;
        return react_redux_1.connect(function (state) {
            var props = reducers.reduce(function (accumulator, currentValue) {
                var _a;
                return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue._name] = state[currentValue._name] || {}, _a)));
            }, {});
            if (ts_data_validator_1.isString(formName)) {
                props.formValues = redux_form_1.getFormValues(formName)(state) || {};
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
        this.dispatch(__assign({ type: "@@SSR/" + Reducer._name }, initial));
    };
    ReduxStore.prototype.unregisterReducer = function (Reducer) {
        this.store.replaceReducer(this.reducerManager.remove(ts_data_validator_1.isString(Reducer) ? Reducer : Reducer._name));
    };
    return ReduxStore;
}());
var _a = new ReduxStore(), connectReducers = _a.connectReducers, dispatch = _a.dispatch, getState = _a.getState, registerReducer = _a.registerReducer, ssr = _a.ssr, store = _a.store, unregisterReducer = _a.unregisterReducer;
exports.connectReducers = connectReducers;
exports.dispatch = dispatch;
exports.getState = getState;
exports.registerReducer = registerReducer;
exports.ssr = ssr;
exports.unregisterReducer = unregisterReducer;
exports.default = store;
//# sourceMappingURL=index.js.map