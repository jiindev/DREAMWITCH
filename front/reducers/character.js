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
  export const SAY_ADD_HISTORY = 'SAY_ADD_HISTORY';
  export const SAY_LOAD_TODOS = 'SAY_LOAD_TODOS';
  export const SAY_RESET = 'SAY_RESET';
  export const SAY_LOAD_ITEMS = 'SAY_LOAD_ITEMS';
  export const SAY_BUY_ITEM = 'SAY_BUY_ITEM';
  export const SAY_EQUIP_ITEM = 'SAY_EQUIP_ITEM';
  export const SAY_UNEQUIP_ITEM = 'SAY_UNEQUIP_ITEM';
  
  
  
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
            draft.talking = `전부 완료! 구슬을 눌러봐!`;
          break;
        }
        case SAY_LOAD_ITEMS: {
          draft.talking = `뭐가 잘 어울릴까?`;
          break;
        }
        case SAY_ADD_HISTORY:{
          draft.talking = `꿈의 별 수집 완료! 수고 많았어!`;
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
            if(draft.talking!==`전부 완료! 구슬을 눌러봐!`&&draft.talking!==`어서와, ${draft.nickname}!`){
              draft.talking = `나와라, 오늘의 할 일!`;
            }
          break;
        }
        case SAY_BUY_ITEM: {
          draft.talking = `날 위한 선물? 고마워!`;
          break;
        }
        case SAY_EQUIP_ITEM: {
          draft.talking = `어때? 잘 어울려?`;
          break;
        }
        case SAY_UNEQUIP_ITEM: {
          draft.talking = `흠... 별론가?`;
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
  