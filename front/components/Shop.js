import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {HeadItems} from '../static/itemData';
import { LOAD_ITEMS_REQUEST, BUY_ITEM_REQUEST, EQUIP_ITEM_REQUEST, UNEQUIP_ITEM_REQUEST } from "../reducers/item";



const Shop = () => {
  const dispatch = useDispatch();
  const { items, head } = useSelector(state=>state.item);

  const onClickBuy = useCallback((itemId, itemType) => () => {
    dispatch({
      type: BUY_ITEM_REQUEST,
      data: {itemId, itemType}
    })
  }, []);

  const onClickEquip = useCallback((itemId, itemType) => () => {
    dispatch({
      type: EQUIP_ITEM_REQUEST,
      data: {itemId, itemType}
    })
  }, []);

  const onClickUnequip = useCallback((itemId, itemType) => () => {
    dispatch({
      type: UNEQUIP_ITEM_REQUEST,
      data: {itemId, itemType}
    })
  }, []);

  return <div>
    {HeadItems.map((v, i)=>{
      return (
      <li>
        <div>{v.name}</div>
        <div>{v.price}</div>
        {items && items.includes(v.id) ?
        head && head.itemId === v.id ?
        <button onClick={onClickUnequip(v.id, 'head')}>장착해제</button>
        :
        <button onClick={onClickEquip(v.id, 'head')}>장착하기</button>
        :
        <button onClick={onClickBuy(v.id, 'head')}>구매하기</button>
        }
      </li>)
    })}
  </div>;
};

export default Shop;
