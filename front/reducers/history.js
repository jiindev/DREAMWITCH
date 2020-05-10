import produce from 'immer';

export const initialState = {
    histories: [],
  };
  
  export const LOAD_HISTORIES_REQUEST = "LOAD_HISTORIES_REQUEST";
  export const LOAD_HISTORIES_SUCCESS = "LOAD_HISTORIES_SUCCESS";
  export const LOAD_HISTORIES_FAILURE = "LOAD_HISTORIES_FAILURE";

  export const LOAD_USER_HISTORIES_REQUEST = "LOAD_USER_HISTORIES_REQUEST";
  export const LOAD_USER_HISTORIES_SUCCESS = "LOAD_USER_HISTORIES_SUCCESS";
  export const LOAD_USER_HISTORIES_FAILURE = "LOAD_USER_HISTORIES_FAILURE";

  export const LOAD_HISTORY_REQUEST = "LOAD_HISTORY_REQUEST";
  export const LOAD_HISTORY_SUCCESS = "LOAD_HISTORY_SUCCESS";
  export const LOAD_HISTORY_FAILURE = "LOAD_HISTORY_FAILURE";

  export const ADD_HISTORIES_REQUEST = "ADD_HISTORIES_REQUEST";
  export const ADD_HISTORIES_SUCCESS = "ADD_HISTORIES_SUCCESS";
  export const ADD_HISTORIES_FAILURE = "ADD_HISTORIES_FAILURE";
  
  export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
  export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
  export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

  export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
  export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
  export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

  
  
  const reducer = (state = initialState, action) => {
    return produce(state, (draft)=>{
      switch (action.type) {
        case LOAD_HISTORIES_REQUEST: {
          draft.histories = !action.lastId ? [] : draft.histories;
          draft.hasMoreHistories = action.lastId ? state.hasMoreHistories : true; 
          break;
        }
        case LOAD_HISTORIES_SUCCESS: {
            action.data.map((v, i)=>{
              draft.histories.push(v);
            });
            draft.hasMoreHistories = action.data.length === 5;
        }
        case LOAD_HISTORIES_FAILURE: {
          break;
        }
        case LOAD_USER_HISTORIES_REQUEST: {
          draft.histories = !action.lastId ? [] : draft.histories;
          draft.hasMoreHistories = action.lastId ? state.hasMoreHistories : true; 
          break;
        }
        case LOAD_USER_HISTORIES_SUCCESS: {
          action.data.map((v, i)=>{
            draft.histories.push(v);
          });
          draft.hasMoreHistories = action.data.length === 5;
        }
        case LOAD_USER_HISTORIES_FAILURE: {
          break;
        }
        case LOAD_HISTORY_REQUEST: {
          break;
        }
        case LOAD_HISTORY_SUCCESS: {
          let historyIndex = draft.histories.findIndex(v=>v.id === action.data.historyId);
          draft.histories[historyIndex].todos = action.data.todos;
          draft.histories[historyIndex].comments = action.data.comments;
          break;
        }
        case LOAD_HISTORY_FAILURE: {
          break;
        }
        case ADD_HISTORIES_REQUEST: {
          break;
        }
        case ADD_HISTORIES_SUCCESS: {
          draft.histories.unshift(action.data);
          break;
        }
        case ADD_HISTORIES_FAILURE: {
          break;
        }
        case ADD_COMMENT_REQUEST: {
          break;
        }
        case ADD_COMMENT_SUCCESS: {
          let historyIndex = draft.histories.findIndex(v=>v.id === action.data.historyId);
          draft.histories[historyIndex].comments.push(action.data.comment);
          break;
        }
        case REMOVE_COMMENT_FAILURE: {
          break;
        }
        case REMOVE_COMMENT_SUCCESS: {
          let historyIndex = draft.histories.findIndex(v=>v.id === action.data.historyId);
          let commentIndex = draft.histories[historyIndex].comments.findIndex(v=>v.id===action.data.commentId);
          draft.histories[historyIndex].comments.splice(commentIndex, 1);
          break;
        }
        case REMOVE_COMMENT_FAILURE: {
          break;
        }
        default: {
          break;
        }
      }
    })
  };
  
  export default reducer;
  