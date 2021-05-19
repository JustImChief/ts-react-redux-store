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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import DataTransformer from 'ts-data-transformer';
import DataValidator from 'ts-data-validator';
var types = {
    array: 'array',
    bool: 'bool',
    number: 'number',
    object: 'object',
    string: 'string',
};
var Reducer = /** @class */ (function () {
    function Reducer(initialState) {
        var _a;
        if (initialState === void 0) { initialState = {}; }
        this.DT = DataTransformer;
        this.DV = DataValidator;
        this.initialData = {};
        this.initialValues = {};
        this.initialState = {
            initialStateLoaded: false,
            loading: false,
            wait: false,
        };
        var reducer = this.constructor;
        this.actions = (_a = {},
            _a["@@SSR/" + reducer._name] = this.ssrInit.bind(this),
            _a);
        this.initialData = (initialState === null || initialState === void 0 ? void 0 : initialState.data) || {};
        this.initialValues = (initialState === null || initialState === void 0 ? void 0 : initialState.values) || {};
        this.init = this.init.bind(this);
        this.reducer = this.reducer.bind(this);
        this.prepareValues = this.prepareValues.bind(this);
        this.getValue = this.getValue.bind(this);
        this.failure = this.failure.bind(this);
        this.request = this.request.bind(this);
        this.ssrInit = this.ssrInit.bind(this);
        this.success = this.success.bind(this);
        this.initialState = __assign(__assign({}, this.initialState), { data: this.prepareValues(this.initialData), values: this.prepareValues(this.initialValues) });
        this.init();
    }
    Object.defineProperty(Reducer, "initialState", {
        get: function () {
            return new this().initialState;
        },
        enumerable: false,
        configurable: true
    });
    Reducer.prototype.init = function () {
        return this.reducer();
    };
    Reducer.prototype.reducer = function () {
        var _this = this;
        return function (state, action) {
            if (state === void 0) { state = _this.initialState; }
            if (_this.actions.hasOwnProperty(action.type)) {
                return _this.actions[action.type](state, action);
            }
            return __assign({}, state);
        };
    };
    Reducer.prototype.prepareValues = function (initial, values) {
        var _this = this;
        if (values === void 0) { values = {}; }
        return Object.keys(initial).reduce(function (accumulator, currentValue) {
            var _a;
            return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue] = _this.getValue(initial[currentValue], values[currentValue]), _a)));
        }, {});
    };
    Reducer.prototype.getValue = function (valueType, value) {
        var _this = this;
        if (this.DV.isObject(valueType)) {
            return Object.keys(valueType).reduce(function (accumulator, currentValue) {
                var _a;
                return (__assign(__assign({}, accumulator), (_a = {}, _a[currentValue] = _this.getValue(valueType[currentValue], (value || {})[currentValue]), _a)));
            }, {});
        }
        if (Array.isArray(valueType)) {
            var type = valueType[0], defaultValue = valueType[1];
            switch (type) {
                case types.array:
                    return this.DT.toArray(value, this.DV.isUndefined(defaultValue) ? null : defaultValue);
                case types.bool:
                    return this.DT.toBoolean(value, this.DV.isUndefined(defaultValue) ? null : defaultValue);
                case types.number:
                    return this.DT.toNumber(value, this.DV.isUndefined(defaultValue) ? null : defaultValue);
                case types.object:
                    return this.DT.toObject(value, this.DV.isUndefined(defaultValue) ? null : defaultValue);
                case types.string:
                    return this.DT.toObject(value, this.DV.isUndefined(defaultValue) ? null : defaultValue);
            }
        }
        switch (valueType) {
            case types.array:
                return this.DT.toArray(value, []);
            case types.bool:
                return this.DT.toBoolean(value, false);
            case types.number:
                return this.DT.toNumber(value, null);
            case types.object:
                return this.DT.toObject(value, {});
            case types.string:
                return this.DT.toString(value, null);
            default:
                return !this.DV.isUndefined(value) ? value : valueType || null;
        }
    };
    Reducer.prototype.failure = function (state, action, wait) {
        var _a;
        if (wait === void 0) { wait = false; }
        return __assign(__assign({}, state), (_a = {}, _a[wait ? 'wait' : 'loading'] = false, _a));
    };
    Reducer.prototype.request = function (state, action, wait) {
        var _a;
        if (wait === void 0) { wait = false; }
        return __assign(__assign({}, state), (_a = {}, _a[wait ? 'wait' : 'loading'] = true, _a));
    };
    Reducer.prototype.ssrInit = function (state, action) {
        var type = action.type, ssr = __rest(action, ["type"]);
        return __assign(__assign({}, state), ssr);
    };
    Reducer.prototype.success = function (state, action, wait) {
        var _a;
        if (wait === void 0) { wait = false; }
        return __assign(__assign({}, state), (_a = {}, _a[wait ? 'wait' : 'loading'] = false, _a));
    };
    Reducer._name = 'abstract';
    return Reducer;
}());
export default Reducer;
export { types };
//# sourceMappingURL=index.js.map