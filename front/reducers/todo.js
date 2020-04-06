export const initialState={
    date : false,
    isCleared : false,
    todos : [],
}

export const ADD_TODO = 'ADD_TODO';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addTodoAction = {
    type: ADD_TODO,
    data: {
        
    }
};

export const addDummyAction = {
    type: ADD_DUMMY,
    data: {todoId: 1, content: '밥먹기', checked: false, User: {userId:1}}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
        }
        case ADD_DUMMY: {
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;