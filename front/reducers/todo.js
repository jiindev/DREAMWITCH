export const initialState = {
  date: false,
  isCleared: false,
  todos: [],
};

export const ADD_TODO = "ADD_TODO";
export const CHECK_TODO = "CHECK_TODO";

export const LOAD_TODOS = "LOAD_TODOS";
export const ADD_DUMMY = "ADD_DUMMY";

export const EDIT_TODO = "EDIT_TODO";
export const REMOVE_TODO = "REMOVE_TODO";

export const editTodoAction = (data) => {
  return {
    type: EDIT_TODO,
    data: data,
  };
};

export const checkTodoAction = (data) => {
  return { type: CHECK_TODO, data: data };
};

export const addTodoAction = {
  type: ADD_DUMMY,
  data: { todoId: 1, content: "밥먹기", checked: false, User: { userId: 1 } },
};

export const loadTodosAction = {
  type: LOAD_TODOS,
  data: {
    date: "2020-04-06",
    isCleared: false,
    todos: [
      { todoId: 555, content: "밥먹기", checked: false, User: { userId: 1 } },
      { todoId: 2, content: "숙제하기", checked: true, User: { userId: 1 } },
      { todoId: 43, content: "숙면", checked: false, User: { userId: 1 } },
    ],
  },
};

export const removeTodoAction = (data) => {
  return {
    type: REMOVE_TODO,
    data: data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.data],
      };
    }
    case CHECK_TODO: {
      console.log("action.data.index:", action.data.index);
      const todoIndex = state.todos.findIndex(
        (v) => v.todoId === state.todos[action.data.index].todoId
      );
      console.log(
        "state.todos: ",
        state.todos,
        ", action.data.todoId:",
        action.data.todoId,
        ", todoIndex:",
        todoIndex
      );
      const todos = [...state.todos];
      todos[todoIndex].checked = !todos[todoIndex].checked;
      return {
        ...state,
        todos,
      };
    }
    case LOAD_TODOS: {
      return {
        ...state,
        date: action.data.date,
        isCleared: action.data.isCleared,
        todos: action.data.todos,
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        todos: [...state.todos, action.data],
      };
    }
    case EDIT_TODO: {
      const todoIndex = state.todos.findIndex(
        (v) => v.todoId === state.todos[action.data.index].todoId
      );
      const todos = [...state.todos];
      todos[todoIndex].content = action.data.content;
      return {
        ...state,
        todos,
      };
    }
    case REMOVE_TODO: {
      const todoIndex = state.todos.findIndex(
        (v) => v.todoId === state.todos[action.data.index].todoId
      );
      const todos = [...state.todos];
      todos.splice(todoIndex, 1);
      return {
        ...state,
        todos,
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
