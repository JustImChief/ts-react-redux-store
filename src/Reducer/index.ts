import DataTransformer                                       from 'ts-data-transformer';
import DataValidator                                         from 'ts-data-validator';
import { AnyAction, CombinedState, Reducer as ReduxReducer } from 'redux';

const types = {
  array:  'array',
  bool:   'bool',
  number: 'number',
  object: 'object',
  string: 'string',
};

class Reducer {
  static _name = 'abstract';

  static get initialState() {
    return new this().initialState;
  }

  actions: {[p: string]: (state: CombinedState<{}>, action: AnyAction) => CombinedState<{}>};

  DT = DataTransformer;
  DV = DataValidator;

  initialData   = {};
  initialValues = {};

  initialState: StateType & {
    initialStateLoaded?: boolean,
    loading?: boolean,
    wait?: boolean,
  } = {
    initialStateLoaded: false,
    loading:            false,
    wait:               false,
  };

  protected constructor(initialState: InitialStateType = {}) {
    this.actions = {
      [`@@SSR/${this.constructor['_name']}`]: this.ssrInit.bind(this),
    };

    this.initialData   = initialState?.data || {};
    this.initialValues = initialState?.values || {};

    this.init          = this.init.bind(this);
    this.reducer       = this.reducer.bind(this);
    this.prepareValues = this.prepareValues.bind(this);
    this.getValue      = this.getValue.bind(this);
    this.failure       = this.failure.bind(this);
    this.request       = this.request.bind(this);
    this.ssrInit       = this.ssrInit.bind(this);
    this.success       = this.success.bind(this);

    this.initialState = {
      ...this.initialState,
      data:   this.prepareValues(this.initialData),
      values: this.prepareValues(this.initialValues),
    };

    this.init();
  }

  protected init(): ReduxReducer {
    return this.reducer();
  }

  protected reducer(): ReduxReducer {
    return (state = this.initialState, action) => {
      if (this.actions.hasOwnProperty(action.type)) {
        return this.actions[action.type](state, action);
      }

      return {...state};
    };
  }

  protected prepareValues(initial: {[p: string]: any}, values: {[p: string]: any} = {}): {[p: string]: any} {
    return Object.keys(initial).reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: this.getValue(initial[currentValue], values[currentValue]),
    }), {});
  }

  protected getValue(valueType: [string, any] | {[p: string]: any} | string, value?: any): any[] | boolean | null | number | {[p: string]: any} | string {
    if (this.DV.isObject(valueType)) {
      return Object.keys(valueType).reduce((accumulator, currentValue) => ({
        ...accumulator,
        [currentValue]: this.getValue(valueType[currentValue], (value || {})[currentValue]),
      }), {});
    }

    if (Array.isArray(valueType)) {
      const [type, defaultValue] = valueType;

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
  }

  protected failure(state: CombinedState<{}>, action: AnyAction, wait = false): CombinedState<{}> {
    return {
      ...state,
      [wait ? 'wait' : 'loading']: false,
    };
  }

  protected request(state: CombinedState<{}>, action: AnyAction, wait = false): CombinedState<{}> {
    return {
      ...state,
      [wait ? 'wait' : 'loading']: true,
    };
  }

  ssrInit(state: CombinedState<{}>, action: AnyAction): CombinedState<{}> {
    const {type, ...ssr} = action;

    return {
      ...state,
      ...ssr,
    };
  }

  protected success(state: CombinedState<{}>, action: AnyAction, wait = false): CombinedState<{}> {
    return {
      ...state,
      [wait ? 'wait' : 'loading']: false,
    };
  }
}

export default Reducer;
export type InitialStateType = {
  data?: {[p: string]: any},
  values?: {[p: string]: any},
};
export type StateType = InitialStateType & {
  initialStateLoaded?: boolean,
  loading?: boolean,
  wait?: boolean,
}
export { types };