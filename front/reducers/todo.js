import produce from 'immer';

export const initialState = {
  date: '',
  isCleared: false,
  todos: [],
  clearPercentage: 0,
  lastTodos: [],
  userTodos: [],
};

export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const CHECK_TODO_REQUEST = "CHECK_TODO_REQUEST";
export const CHECK_TODO_SUCCESS = "CHECK_TODO_SUCCESS";
export const CHECK_TODO_FAILURE = "CHECK_TODO_FAILURE";

export const LOAD_TODOS_REQUEST = "LOAD_TODOS_REQUEST";
export const LOAD_TODOS_SUCCESS = "LOAD_TODOS_SUCCESS";
export const LOAD_TODOS_FAILURE = "LOAD_TODOS_FAILURE";

export const EDIT_TODO_REQUEST = "EDIT_TODO_REQUEST";
export const EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS";
export const EDIT_TODO_FAILURE = "EDIT_TODO_FAILURE";

export const REMOVE_TODO_REQUEST = "REMOVE_TODO_REQUEST";
export const REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS";
export const REMOVE_TODO_FAILURE = "REMOVE_TODO_FAILURE";

export const LOAD_LAST_TODOS_REQUEST = "LOAD_LAST_TODOS_REQUEST";
export const LOAD_LAST_TODOS_SUCCESS = "LOAD_LAST_TODOS_SUCCESS";
export const LOAD_LAST_TODOS_FAILURE = "LOAD_LAST_TODOS_FAILURE";

export const CLEAN_LAST_TODOS_REQUEST = "CLEAN_LAST_TODOS_REQUEST";
export const CLEAN_LAST_TODOS_SUCCESS = "CLEAN_LAST_TODOS_SUCCESS";
export const CLEAN_LAST_TODOS_FAILURE = "CLEAN_LAST_TODOS_FAILURE";


export const TODOS_CLEAR = 'TODOS_CLEAR';

const reducer = (state = initialState, action) => {
  return produce(state, (draft)=>{
    switch (action.type) {
      case ADD_TODO_REQUEST: {
        break;
      }
      case ADD_TODO_SUCCESS: {
        draft.todos.push(action.data);
        draft.clearPercentage = Math.floor(draft.todos.filter(v=>v.checked===true).length/draft.todos.length * 100 );
        break;
      }
      case ADD_TODO_FAILURE: {
        break;
      }
      case CHECK_TODO_REQUEST: {
        break;
      }
      case CHECK_TODO_SUCCESS: {
        const todoIndex = draft.todos.findIndex(v=>v.id===action.data.id);
        draft.todos[todoIndex].checked = action.data.checked;
        draft.clearPercentage = Math.floor(draft.todos.filter(v=>v.checked===true).length / draft.todos.length * 100);
        break;
      }
      case CHECK_TODO_FAILURE: {
        break;
      }
      case LOAD_TODOS_REQUEST: {
        break;
      }
      case LOAD_TODOS_SUCCESS: {
        draft.date = action.data.date;
        draft.isCleared = action.data.todos[0] ? action.data.todos[0].HistoryId ? true : false : false;
        draft.todos = action.data.todos;
        draft.clearPercentage = draft.todos[0] ? Math.floor(action.data.todos.filter(v=>v.checked===true).length/action.data.todos.length * 100) : 0;
        break;
      }
      case LOAD_TODOS_FAILURE: {
        break;
      }
      case EDIT_TODO_REQUEST: {
        break;
      }
      case EDIT_TODO_SUCCESS: {
        const todoIndex = draft.todos.findIndex((v)=>v.id===action.data.id);
        draft.todos[todoIndex].content = action.data.content;
        break;
      }
      case EDIT_TODO_FAILURE: {
        break;
      }
      case REMOVE_TODO_REQUEST: {
        break;
      }
      case REMOVE_TODO_SUCCESS: {
        const todoIndex = draft.todos.findIndex(v=>v.id===action.data);
        draft.todos.splice(todoIndex, 1);
        break;
      }
      case REMOVE_TODO_FAILURE: {
        break;
      }

      case LOAD_LAST_TODOS_REQUEST: {
        break;
      }
      case LOAD_LAST_TODOS_SUCCESS: {
        draft.lastTodos = action.data;
        break;
      }
      case LOAD_LAST_TODOS_FAILURE: {
        break;
      }

      case CLEAN_LAST_TODOS_REQUEST: {
        break;
      }
      case CLEAN_LAST_TODOS_SUCCESS: {
        draft.lastTodos = [];
        draft.todos = action.data;
        break;
      }
      case CLEAN_LAST_TODOS_FAILURE: {
        break;
      }
      case TODOS_CLEAR: {
        draft.isCleared = true;
        break;
      }
      default: {
        break;
      }
    }
  })
};

export default reducer;
