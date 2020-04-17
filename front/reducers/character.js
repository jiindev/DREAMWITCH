import produce from 'immer';

export const initialState = {
    nickname: '',
    talking: '',
    face: '',
    effect: '',
  };
  
  export const SAY_HELLO = "SAY_HELLO";
  export const SAY_ADD_TODO = "SAY_ADD_TODO";
  export const SAY_CHECK_TODO = 'SAY_CHECK_TODO';
  export const SAY_EDIT_TODO = 'SAY_EDIT_TODO';
  export const SAY_DELETE_TODO = 'SAY_DELETE_TODO';
  export const SAY_COMPLETE_TODOS = 'SAY_COMPLETE_TODOS';
  export const SAY_LOAD_HISTORIES = 'SAY_LOAD_HISTORIES';
  export const SAY_LOAD_TODOS = 'SAY_LOAD_TODOS';
  export const SAY_RESET = 'SAY_RESET';

  
  
  const reducer = (state = initialState, action) => {
    return produce(state, (draft)=>{
      switch (action.type) {
        case SAY_HELLO: {
            draft.nickname = action.data;
            draft.talking = `어서와, ${draft.nickname}!`;
          break;
        }
        case SAY_ADD_TODO: {
            draft.talking = `할 일 추가 완료!`;
          break;
        }
        case SAY_CHECK_TODO: {
            draft.talking = `하나 완료! 멋져멋져~`;
          break;
        }
        case SAY_EDIT_TODO: {
            draft.talking = `이렇게 고치면 될까?`;
          break;
        }
        case SAY_DELETE_TODO: {
            draft.talking = `짠! 사라졌습니다~`;
          break;
        }
        case SAY_COMPLETE_TODOS: {
            draft.talking = `완료를 눌러서 오늘 하루를 기록하자!`;
          break;
        }
        case SAY_LOAD_HISTORIES: {
            if(action.data === 0){
                draft.talking = `시작이 반이야! 오늘부터 시작해볼까?`;
            }else if(action.data === 1){
                draft.talking = `잘 하고 있어! 이렇게 가자.`;
            }else {
                draft.talking = `꿈을 위해 달린 멋진 하루들!`;
            }
            
          break;
        }
        case SAY_LOAD_TODOS: {
            draft.talking = `나와라, 오늘의 할 일!`;
          break;
        }
        case SAY_RESET: {
            draft.talking= '';
        }
        default: {
          break;
        }
      }
    })
  };
  
  export default reducer;
  