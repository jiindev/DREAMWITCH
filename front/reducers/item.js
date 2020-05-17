import produce from 'immer';

export const initialState = {
    items: {hat: [], hair: [], clothes: [], bg: [], wand: [], cat: [],},
    equipment: {hat: 0, hair:0, clothes: 0, bg: 0, wand: 0, cat: 0,},
    buyItemLoading: false,
  };
  
  export const LOAD_ITEMS_REQUEST = "LOAD_ITEMS_REQUEST";
  export const LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS";
  export const LOAD_ITEMS_FAILURE = "LOAD_ITEMS_FAILURE";

  export const LOAD_EQUIPMENT_REQUEST = "LOAD_EQUIPMENT_REQUEST";
  export const LOAD_EQUIPMENT_SUCCESS = "LOAD_EQUIPMENT_SUCCESS";
  export const LOAD_EQUIPMENT_FAILURE = "LOAD_EQUIPMENT_FAILURE";
  
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
            draft.items = {hat: [], hair: [], clothes: [], bg: [], wand: [], cat: []};
            action.data.forEach((v)=>{
                draft.items[v.itemType].push(v.itemId);
            })
            break;
        }
        case LOAD_ITEMS_FAILURE: {
            break;
        }
        case LOAD_EQUIPMENT_REQUEST: {
            break;
        }
        case LOAD_EQUIPMENT_SUCCESS: {
            draft.equipment = action.data;
            break;
        }
        case LOAD_EQUIPMENT_FAILURE: {
            break;
        }
        case BUY_ITEM_REQUEST: {
            draft.buyItemLoading = true;
            break;
        }
        case BUY_ITEM_SUCCESS: {
            draft.items[action.data.itemType].push(action.data.itemId);
            draft.buyItemLoading = false;
            break;
        }
        case BUY_ITEM_FAILURE: {
            draft.buyItemLoading = false;
            break;
        }
        case EQUIP_ITEM_REQUEST: {
            break;
        }
        case EQUIP_ITEM_SUCCESS: {
            draft.equipment[action.data.itemType]=action.data.itemId;
            break;
        }
        case EQUIP_ITEM_FAILURE: {
            break;
        }
        case UNEQUIP_ITEM_REQUEST: {
            break;
        }
        case UNEQUIP_ITEM_SUCCESS: {
            draft.equipment[action.data]=0;
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
  