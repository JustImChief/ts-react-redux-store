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
var redux_1 = require("redux");
var ReducerManager = /** @class */ (function () {
    function ReducerManager(reducers) {
        if (reducers === void 0) { reducers = {}; }
        this.reducer = {};
        this.keysToRemove = [];
        this.reducer = __assign({}, reducers);
        this.combineReducers = redux_1.combineReducers(this.reducer);
        this.add = this.add.bind(this);
        this.getReducerMap = this.getReducerMap.bind(this);
        this.reduce = this.reduce.bind(this);
        this.remove = this.remove.bind(this);
    }
    ReducerManager.prototype.add = function (key, reducer, force) {
        if ((key && !this.reducer.hasOwnProperty(key)) || force) {
            this.reducer[key] = reducer;
            this.combineReducers = redux_1.combineReducers(this.reducer);
        }
        return this.combineReducers;
    };
    ReducerManager.prototype.getReducerMap = function () {
        return this.reducer;
    };
    ReducerManager.prototype.reduce = function (state, action) {
        var newState = __assign({}, state);
        if (this.keysToRemove.length > 0) {
            for (var _i = 0, _a = this.keysToRemove; _i < _a.length; _i++) {
                var key = _a[_i];
                delete newState[key];
            }
            this.keysToRemove = [];
        }
        return this.combineReducers(newState, action);
    };
    ReducerManager.prototype.remove = function (key) {
        if (key && this.reducer.hasOwnProperty(key)) {
            delete this.reducer[key];
            this.keysToRemove.push(key);
            this.combineReducers = redux_1.combineReducers(this.reducer);
        }
        return this.combineReducers;
    };
    ;
    return ReducerManager;
}());
exports.default = ReducerManager;
//# sourceMappingURL=index.js.map