

export const initialState = {
  date: '',
  isCleared: false,
  todos: [],
  clearPercentage: 0,
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

export const TODOS_CLEAR = 'TODOS_CLEAR';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_TODO_SUCCESS: {
      return {
        ...state,
        todos: [...state.todos, action.data],
        clearPercentage: Math.floor([...state.todos, action.data].filter(v=>v.checked===true).length/[...state.todos, action.data].length * 100)
      };
    }
    case ADD_TODO_FAILURE: {
      return {
        ...state,
      };
    }
    case CHECK_TODO_REQUEST: {
      return {
        ...state,
      };
    }
    case CHECK_TODO_SUCCESS: {
      console.log('check:', action.data);
      console.log(state.todos);
      const todoIndex = state.todos.findIndex(
        (v) => v.id === action.data.id
      );
      console.log('check index:',todoIndex);
      const todo = state.todos[todoIndex];
      const todos = [...state.todos];
      const checked = action.data.checked;
      todos[todoIndex] = {...todo, checked};
      return {
        ...state,
        todos,
        clearPercentage: Math.floor(todos.filter(v=>v.checked===true).length/todos.length * 100)
      };
    }
    case CHECK_TODO_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_TODOS_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_TODOS_SUCCESS: {
      console.log(action.data.todos);
      let cleared = action.data.todos[0] ? action.data.todos[0].HistoryId ? true : false : false;
      let clearPercentage = Math.floor(action.data.todos.filter(v=>v.checked===true).length/action.data.todos.length * 100);
      return {
        ...state,
        date: action.data.date,
        isCleared: cleared,
        todos: action.data.todos,
        clearPercentage
      };
    }
    case LOAD_TODOS_FAILURE: {
      return {
        ...state,
      };
    }
    case EDIT_TODO_REQUEST: {
      return {
        ...state,
      };
    }
    case EDIT_TODO_SUCCESS: {
      console.log('edit todo:', action.data.id);
      const todoIndex = state.todos.findIndex(
        (v) => v.id === action.data.id
      );
      console.log('todoindex:', todoIndex);
      const todos = [...state.todos];
      todos[todoIndex].content = action.data.content;
      return {
        ...state,
        todos,
      };
    }
    case EDIT_TODO_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_TODO_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_TODO_SUCCESS: {
      return {
        ...state,
        todos: state.todos.filter(v=>v.id!==action.data),
      };
    }
    case REMOVE_TODO_FAILURE: {
      return {
        ...state,
      };
    }
    case TODOS_CLEAR: {
      return {
        ...state,
        isCleared: true
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
