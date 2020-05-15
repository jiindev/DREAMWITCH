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
  export const SAY_LAST = 'SAY_LAST';
  export const SAY_START = 'SAY_START';
  export const SAY_LEVEL_UP = 'SAY_LEVEL_UP';
  export const SAY_LOAD_HISTORIES = 'SAY_LOAD_HISTORIES';
  export const SAY_LOAD_HISTORY = 'SAY_LOAD_HISTORY';
  export const SAY_ADD_HISTORY = 'SAY_ADD_HISTORY';
  export const SAY_LOAD_TODOS = 'SAY_LOAD_TODOS';
  export const SAY_RESET = 'SAY_RESET';
  export const SAY_LOAD_ITEMS = 'SAY_LOAD_ITEMS';
  export const SAY_BUY_ITEM = 'SAY_BUY_ITEM';
  export const SAY_EQUIP_ITEM = 'SAY_EQUIP_ITEM';
  export const SAY_UNEQUIP_ITEM = 'SAY_UNEQUIP_ITEM';
  export const SAY_NO_STAR = 'SAY_NO_STAR';
  
  
  
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
            draft.character.effect= '';
          break;
        }
        case SAY_CHECK_TODO: {
            draft.character.talking = `하나 완료! 멋져멋져~`;
            draft.character.emotion= 'happy2';
            draft.character.effect= '';
          break;
        }
        case SAY_EDIT_TODO: {
            draft.character.talking = `이렇게 고치면 될까?`;
            draft.character.emotion= 'wink';
            draft.character.effect= '';
          break;
        }
        case SAY_DELETE_TODO: {
            draft.character.talking = `짠! 사라졌습니다~`;
            draft.character.emotion= 'hmm';
            draft.character.effect= '';
          break;
        }
        case SAY_COMPLETE_TODOS: {
            draft.character.talking = `전부 완료! 구슬을 눌러봐!`;
            draft.character.emotion= 'happy2';
            draft.character.effect= 'happy';
          break;
        }
        case SAY_LAST: {
          const percentage = action.data.filter((v)=>v.checked===true).length/action.data.length;
          if(!action.data[0].HistoryId){
            if(percentage===1){
              draft.character.talking = `구슬을 모으는걸 잊으면 안돼!`;
              draft.character.emotion= 'sad';
              draft.character.effect= 'sad';
              break;
            }else if(percentage>=0.7){
              draft.character.talking = `아쉽다~ 조금만 더 힘냈더라면!`;
              draft.character.emotion= 'sad2';
              draft.character.effect= '';
              break;
            }else if(percentage>=0.3){
              draft.character.talking = `오늘 열심히 해서 만회하자! 알았지?`;
              draft.character.emotion= 'mad2';
              draft.character.effect= 'mad';
              break;
            }else{
              draft.character.talking = `계획을 할 수 있는 만큼만 세워보자구!`;
              draft.character.emotion= 'mad';
              draft.character.effect= 'mad';
              break;
            }
          }
          draft.character.talking = `멋지게 성공했었지!`;
          draft.character.emotion= 'happy';
          draft.character.effect= 'happy';
          break;
        }
        case SAY_START: {
          draft.character.talking = `오늘의 미션 스타트!`;
          draft.character.emotion= 'hmm';
          draft.character.effect= '';
          break;
        }
        case SAY_LOAD_ITEMS: {
          draft.character.talking = `뭐가 잘 어울릴까?`;
          draft.character.emotion= 'wink';
          draft.character.effect= '';
          break;
        }
        case SAY_ADD_HISTORY:{
          draft.character.talking = `꿈의 별 수집 완료! 수고 많았어!`;
          draft.character.emotion= 'happy';
          draft.character.effect= 'happy2';
          break;
        }
        case SAY_LEVEL_UP:{
          draft.character.talking = `레벨 업! 더 멋진 마법을 보여줄게!`;
          draft.character.emotion= 'happy2';
          draft.character.effect= 'happy2';
          break;
        }
        case SAY_LOAD_HISTORIES: {
            if(action.data === 0){
                draft.character.talking = `시작이 반이야! 오늘부터 시작해볼까?`;
            }else if(action.data < 5){
                draft.character.talking = `잘 하고 있어! 열심히 하자~`;
            }else {
                draft.character.talking = `꿈의 구슬을 이렇게나 모았어!`;
            }
            draft.character.emotion= 'happy2';
            draft.character.effect= '';
          break;
        }
        case SAY_LOAD_HISTORY: {
          draft.character.talking = `어디 보자~`;
          draft.character.emotion= 'oh';
          draft.character.effect= '';
        break;
      }
        case SAY_LOAD_TODOS: {
            if(draft.character.talking!==`전부 완료! 구슬을 눌러봐!`&&draft.character.talking!==`어서와, ${draft.nickname}!`){
              draft.character.talking = `나와라, 오늘의 할 일!`;
              draft.character.emotion= 'happy';
              draft.character.effect= '';
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
          draft.character.effect= '';
          break;
        }
        case SAY_UNEQUIP_ITEM: {
          draft.character.emotion= 'oh';
          draft.character.effect= '';
          break;
        }
        case SAY_NO_STAR: {
          draft.character.talking = `별이 부족해~!`;
          draft.character.emotion= 'sad';
          draft.character.effect= 'sad';
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
  