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
exports.types = exports.unregisterReducer = exports.registerReducer = exports.Reducer = exports.getState = exports.dispatch = exports.connectReducers = void 0;
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_form_1 = require("redux-form");
var react_redux_1 = require("react-redux");
var ts_data_validator_1 = require("ts-data-validator");
var Reducer_1 = require("../Reducer");
Object.defineProperty(exports, "Reducer", { enumerable: true, get: function () { return Reducer_1.default; } });
var ReducerManager_1 = require("../ReducerManager");
var reducerManager = new ReducerManager_1.default({ form: redux_form_1.reducer });
var middleware = process.env.NODE_ENV === 'production'
    ? redux_1.applyMiddleware(redux_thunk_1.default)
    : redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default));
function createStorage() {
    return redux_1.createStore(reducerManager.reduce, middleware);
}
var store = createStorage();
var dispatch = store.dispatch;
exports.dispatch = dispatch;
function getState(reducer) {
    var state = store.getState();
    return state[reducer] || {};
}
exports.getState = getState;
function registerReducer(Reducer, initialState) {
    if (initialState === void 0) { initialState = {}; }
    store.replaceReducer(reducerManager.add(Reducer._name, new Reducer().ssr(initialState), true));
}
exports.registerReducer = registerReducer;
function unregisterReducer(Reducer) {
    store.replaceReducer(reducerManager.remove(ts_data_validator_1.isString(Reducer) ? Reducer : Reducer._name));
}
exports.unregisterReducer = unregisterReducer;
function connectReducers() {
    var reducersOrFormName = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducersOrFormName[_i] = arguments[_i];
    }
    var _a = reducersOrFormName
        .reduce(function (accumulator, currentValue) {
        if (typeof currentValue === 'string') {
            accumulator.formName = currentValue;
        }
        else {
            registerReducer(currentValue);
            accumulator.reducers.push(currentValue);
        }
        return accumulator;
    }, { reducers: [] }), reducers = _a.reducers, formName = _a.formName;
    function mapStateToProps(state) {
        var props = reducers.reduce(function (accumulator, currentValue) {
            var _a;
            return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue._name] = state[currentValue._name] || {}, _a)));
        }, {});
        if (ts_data_validator_1.isString(formName)) {
            props.formValues = redux_form_1.getFormValues(formName)(state) || {};
        }
        return __assign({}, props);
    }
    return react_redux_1.connect(mapStateToProps);
}
exports.connectReducers = connectReducers;
exports.default = store;
var Reducer_2 = require("../Reducer");
Object.defineProperty(exports, "types", { enumerable: true, get: function () { return Reducer_2.types; } });
//# sourceMappingURL=index.js.map