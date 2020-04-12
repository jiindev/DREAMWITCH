const dummyData = {
  date: "2020-04-06",
  isCleared: false,
  todos: [
    { id: 555, content: "밥먹기", checked: false, User: { userId: 1 } },
    { id: 2, content: "숙제하기", checked: true, User: { userId: 1 } },
    { id: 43, content: "숙면", checked: false, User: { userId: 1 } },
  ],
};

export const initialState = {
  date: false,
  isCleared: false,
  todos: [],
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
      const todoIndex = state.todos.findIndex(
        (v) => v.id === action.data
      );
      const todo = state.todos[todoIndex];
      const todos = [...state.todos];
      const checked = !todo.checked;
      todos[todoIndex] = {...todo, checked};
      return {
        ...state,
        todos,
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
      console.log(action.data);
      return {
        ...state,
        date: dummyData.date,
        isCleared: dummyData.isCleared,
        todos: dummyData.todos,
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
      const todoIndex = state.todos.findIndex(
        (v) => v.id === action.data.id
      );
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
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
