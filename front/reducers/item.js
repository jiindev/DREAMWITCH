import produce from 'immer';

export const initialState = {
    items: [],
    head: {itemId:0},
  };
  
  export const LOAD_ITEMS_REQUEST = "LOAD_ITEMS_REQUEST";
  export const LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS";
  export const LOAD_ITEMS_FAILURE = "LOAD_ITEMS_FAILURE";
  
  export const BUY_ITEM_REQUEST = "BUY_ITEM_REQUEST";
  export const BUY_ITEM_SUCCESS = "BUY_ITEM_SUCCESS";
  export const BUY_ITEM_FAILURE = "BUY_ITEM_FAILURE";

  export const EQUIP_ITEM_REQUEST = "EQUIP_ITEM_REQUEST";
  export const EQUIP_ITEM_SUCCESS = "EQUIP_ITEM_SUCCESS";
  export const EQUIP_ITEM_FAILURE = "EQUIP_ITEM_FAILURE";

  export const UNEQUIP_ITEM_REQUEST = "UNEQUIP_ITEM_REQUEST";
  export const UNEQUIP_ITEM_SUCCESS = "UNEQUIP_ITEM_SUCCESS";
  export const UNEQUIP_ITEM_FAILURE = "UNEQUIP_ITEM_FAILURE";


  
  
  const reducer = (state = initialState, action) => {
    return produce(state, (draft)=>{
      switch (action.type) {
        case LOAD_ITEMS_REQUEST: {
            break;
        }
        case LOAD_ITEMS_SUCCESS: {
            draft.items = action.data.map((v)=>{return v.itemId});
            const headExists = action.data.filter((v)=>v.equipped === true && v.itemType === 'head');
            draft.head = headExists ? action.data.filter((v)=>v.equipped === true && v.itemType === 'head')[0] : {itemId: 0};
            break;
        }
        case LOAD_ITEMS_FAILURE: {
            break;
        }
        case BUY_ITEM_REQUEST: {
            break;
        }
        case BUY_ITEM_SUCCESS: {
            draft.items.push(action.data.itemId)
            break;
        }
        case BUY_ITEM_FAILURE: {
            break;
        }
        case EQUIP_ITEM_REQUEST: {
            break;
        }
        case EQUIP_ITEM_SUCCESS: {
            draft[action.data.itemType]=action.data;
            break;
        }
        case EQUIP_ITEM_FAILURE: {
            break;
        }
        case UNEQUIP_ITEM_REQUEST: {
            break;
        }
        case UNEQUIP_ITEM_SUCCESS: {
            console.log(action.data);
            draft[action.data]={itemId:0};
            break;
        }
        case UNEQUIP_ITEM_FAILURE: {
            break;
        }
        default: {
          break;
        }
      }
    })
  };
  
  export default reducer;
  