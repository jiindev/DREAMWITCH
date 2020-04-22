import { all, fork, takeLatest, call, put, delay } from "redux-saga/effects";
import axios from 'axios';
import { LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAILURE, LOAD_ITEMS_REQUEST, BUY_ITEM_SUCCESS, BUY_ITEM_FAILURE, BUY_ITEM_REQUEST, EQUIP_ITEM_SUCCESS, EQUIP_ITEM_FAILURE, EQUIP_ITEM_REQUEST, UNEQUIP_ITEM_FAILURE, UNEQUIP_ITEM_SUCCESS, UNEQUIP_ITEM_REQUEST } from "../reducers/item";
import { USE_STARS } from "../reducers/user";

function loadItemsAPI() {
  return axios.get("/items", {
    withCredentials: true
  });
}
function* loadItems() {
  try {
    const result = yield call(loadItemsAPI);
    yield put({
      type: LOAD_ITEMS_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_ITEMS_FAILURE,
      error: e,
    });
  }
}
function* watchLoadItems() {
  yield takeLatest(LOAD_ITEMS_REQUEST, loadItems);
}

function buyItemAPI(itemData) {
  return axios.post("/item", itemData,{
    withCredentials: true
  });
}
function* buyItem(action) {
  try {
    const result = yield call(buyItemAPI, action.data);
    yield put({
      type: BUY_ITEM_SUCCESS,
      data: result.data
    });
    yield put({
      type: USE_STARS,
      data: action.data.price
    })
  } catch (e) {
    console.error(e);
    yield put({
      type: BUY_ITEM_FAILURE,
      error: e,
    });
  }
}
function* watchBuyItem() {
  yield takeLatest(BUY_ITEM_REQUEST, buyItem);
}

function equipItemAPI(itemData) {
  return axios.patch(`/item/equip/${itemData.itemId}`, itemData,{
    withCredentials: true
  });
}
function* equipItem(action) {
  try {
    const result = yield call(equipItemAPI, action.data);
    yield put({
      type: EQUIP_ITEM_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: EQUIP_ITEM_FAILURE,
      error: e,
    });
  }
}
function* watchEquipItem() {
  yield takeLatest(EQUIP_ITEM_REQUEST, equipItem);
}

function unequipItemAPI(itemData) {
  return axios.patch(`/item/unequip`, itemData,{
    withCredentials: true
  });
}
function* unequipItem(action) {
  try {
    const result = yield call(unequipItemAPI, action.data);
    yield put({
      type: UNEQUIP_ITEM_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNEQUIP_ITEM_FAILURE,
      error: e,
    });
  }
}
function* watchUnequipItem() {
  yield takeLatest(UNEQUIP_ITEM_REQUEST, unequipItem);
}


export default function* itemSaga() {
  yield all([
    fork(watchLoadItems),
    fork(watchBuyItem),
    fork(watchEquipItem),
    fork(watchUnequipItem),
  ]);
}
