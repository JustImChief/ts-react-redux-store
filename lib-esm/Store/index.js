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
import { isString } from 'ts-data-validator';
import { default as Reducer } from '../Reducer';
import { default as ReducerManager } from '../ReducerManager';
var reducerManager = new ReducerManager({ form: form });
var middleware = process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));
function createStorage() {
    return createStore(reducerManager.reduce, middleware);
}
var store = createStorage();
var dispatch = store.dispatch;
function getState(reducer) {
    var state = store.getState();
    return state[reducer] || {};
}
function registerReducer(Reducer, initialState) {
    if (initialState === void 0) { initialState = {}; }
    store.replaceReducer(reducerManager.add(Reducer._name, new Reducer().ssr(initialState), true));
}
function unregisterReducer(Reducer) {
    store.replaceReducer(reducerManager.remove(isString(Reducer) ? Reducer : Reducer._name));
}
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
        if (isString(formName)) {
            props.formValues = getFormValues(formName)(state) || {};
        }
        return __assign({}, props);
    }
    return connect(mapStateToProps);
}
export default store;
export { connectReducers, dispatch, getState, Reducer, registerReducer, unregisterReducer };
export { types } from '../Reducer';
//# sourceMappingURL=index.js.map