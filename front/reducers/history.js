export const initialState = {
    histories: [],
  };
  
  export const LOAD_HISTORIES_REQUEST = "LOAD_HISTORIES_REQUEST";
  export const LOAD_HISTORIES_SUCCESS = "LOAD_HISTORIES_SUCCESS";
  export const LOAD_HISTORIES_FAILURE = "LOAD_HISTORIES_FAILURE";
  
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_HISTORIES_REQUEST: {
        return {
          ...state,
        };
      }
      case LOAD_HISTORIES_SUCCESS: {
        return {
          ...state,
        };
      }
      case LOAD_HISTORIES_FAILURE: {
        return {
          ...state,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default reducer;
  