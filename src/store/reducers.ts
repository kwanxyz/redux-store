import * as fromActions from './actions';

export const initialState = {
  loaded: false,
  loading: false,
  data: [
    {
      label: 'Eat Pizza',
      complete: false
    }
  ]
};

export function reducer(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    // case 'ADD_TODO': {
    case fromActions.ADD_TODO: {
      const todo = action.payload;
      const data = [...state.data, todo];
      return {
        // merge in the existing state with the new object
        ...state,
        //   data: data same as below, which has the new changes
        data
      };
    }
    case fromActions.REMOVE_TODO: {
      const todo = action.payload;
      const data = state.data.filter(
        todo => todo.label !== action.payload.label
      );
      return {
        ...state,
        data
      };
    }
  }
  return state;
}
