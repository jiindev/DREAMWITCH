import produce from 'immer';

export const initialState = {
    histories: [],
  };
  
  export const LOAD_HISTORIES_REQUEST = "LOAD_HISTORIES_REQUEST";
  export const LOAD_HISTORIES_SUCCESS = "LOAD_HISTORIES_SUCCESS";
  export const LOAD_HISTORIES_FAILURE = "LOAD_HISTORIES_FAILURE";

  export const ADD_HISTORIES_REQUEST = "ADD_HISTORIES_REQUEST";
  export const ADD_HISTORIES_SUCCESS = "ADD_HISTORIES_SUCCESS";
  export const ADD_HISTORIES_FAILURE = "ADD_HISTORIES_FAILURE";
  
  
  const reducer = (state = initialState, action) => {
    return produce(state, (draft)=>{
      switch (action.type) {
        case LOAD_HISTORIES_REQUEST: {
          break;
        }
        case LOAD_HISTORIES_SUCCESS: {
          draft.histories = action.data;
          break;
        }
        case LOAD_HISTORIES_FAILURE: {
          break;
        }
        case ADD_HISTORIES_REQUEST: {
          break;
        }
        case ADD_HISTORIES_SUCCESS: {
          draft.histories.push(action.data);
          break;
        }
        case ADD_HISTORIES_FAILURE: {
          break;
        }
        default: {
          break;
        }
      }
    })
  };
  
  export default reducer;
  