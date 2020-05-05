import produce from 'immer';

export const initialState = {
    nickname: '',
    character: {
      talking: '',
      emotion: '',
      effect: '',
    }
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
            draft.character.talking = `어서와, ${draft.nickname}!`;
            draft.character.emotion= 'happy';
            draft.character.effect= 'happy';
            break;
        }
        case SAY_ADD_TODO: {
            draft.character.talking = `할 일 추가 완료!`;
            draft.character.emotion= 'happy';
          break;
        }
        case SAY_CHECK_TODO: {
            draft.character.talking = `하나 완료! 멋져멋져~`;
            draft.character.emotion= 'happy2';
          break;
        }
        case SAY_EDIT_TODO: {
            draft.character.talking = `이렇게 고치면 될까?`;
            draft.character.emotion= 'wink';
          break;
        }
        case SAY_DELETE_TODO: {
            draft.character.talking = `짠! 사라졌습니다~`;
            draft.character.emotion= 'hmm';
          break;
        }
        case SAY_COMPLETE_TODOS: {
            draft.character.talking = `전부 완료! 구슬을 눌러봐!`;
            draft.character.emotion= 'happy2';
            draft.character.effect= 'happy';
          break;
        }
        case SAY_LOAD_ITEMS: {
          draft.character.talking = `뭐가 잘 어울릴까?`;
          draft.character.emotion= 'happy';
          break;
        }
        case SAY_ADD_HISTORY:{
          draft.character.talking = `꿈의 별 수집 완료! 수고 많았어!`;
          draft.character.emotion= 'happy';
          draft.character.effect= 'happy2';
          break;
        }
        case SAY_LOAD_HISTORIES: {
            if(action.data === 0){
                draft.character.talking = `시작이 반이야! 오늘부터 시작해볼까?`;
            }else if(action.data === 1){
                draft.character.talking = `잘 하고 있어! 이렇게 가자.`;
            }else {
                draft.character.talking = `꿈을 위해 달린 멋진 하루들!`;
            }
            draft.character.emotion= 'happy';
          break;
        }
        case SAY_LOAD_TODOS: {
            if(draft.character.talking!==`전부 완료! 구슬을 눌러봐!`&&draft.character.talking!==`어서와, ${draft.nickname}!`){
              draft.character.talking = `나와라, 오늘의 할 일!`;
              draft.character.emotion= 'happy';
            }
          break;
        }
        case SAY_BUY_ITEM: {
          draft.character.talking = `날 위한 선물? 고마워!`;
          draft.character.emotion= 'happy';
          draft.character.effect= 'happy';
          break;
        }
        case SAY_EQUIP_ITEM: {
          draft.character.emotion= 'wink';
          break;
        }
        case SAY_UNEQUIP_ITEM: {
          draft.character.emotion= 'oh';
          break;
        }
        case SAY_RESET: {
            draft.character.talking= '';
            draft.character.effect= '';
            draft.character.emotion= '';
            break;
        }
        default: {
          break;
        }
      }
    })
  };
  
  export default reducer;
  