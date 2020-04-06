export const initialState={
    date : false,
    isCleared : false,
    todos : [],
}

export const ADD_TODO = 'ADD_TODO';

export const LOAD_DUMMY = 'LOAD_DUMMY';
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

export const loadDummyAction = {
    type: LOAD_DUMMY,
    data: {
        date: '2020-04-06',
        isCleared: false,
        todos: [
            {todoId: 1, content: '밥먹기', checked: false, User: {userId:1}},
            {todoId: 2, content: '숙제하기', checked: true, User: {userId:1}},
            {todoId: 3, content: '숙면', checked: false, User: {userId:1}},
        ]
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.data]
            }
        }
        case LOAD_DUMMY: {
            return {
                ...state,
                date: action.data.date,
                isCleared: action.data.isCleared,
                todos: action.data.todos,
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