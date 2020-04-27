import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {hatItems, clothesItems, hairItems, bgItems} from '../static/itemData';
import { LOAD_ITEMS_REQUEST, BUY_ITEM_REQUEST, EQUIP_ITEM_REQUEST, UNEQUIP_ITEM_REQUEST } from "../reducers/item";
import {H2} from './styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_ITEMS } from "../reducers/character";


const Shop = () => {
  const dispatch = useDispatch();
  const { items, equipment } = useSelector(state=>state.item);
  const { me } = useSelector(state=>state.user);

  useEffect(() => {
    dispatch({
      type: SAY_LOAD_ITEMS,
    })
  }, []);

  const onClickItem = useCallback((item) => () => {
    if(!items[item.type].includes(item.id)){ // 현재 아이템 목록에 없음 (구매기능)
      if(me.star<item.price){ // 별이 부족할 경우
        return alert('별이 부족합니다.');
      }else{
        dispatch({
          type: BUY_ITEM_REQUEST,
          data: {itemId:item.id, price:item.price, itemType:item.type}
        })
      }
    }else{
      if(equipment[item.type] === item.id){ //장착중일 시 (장착해제)
          dispatch({
            type: UNEQUIP_ITEM_REQUEST,
            data: {itemId:item.id, itemType:item.type}
          })
        }else{ //장착을 하지 않고 있을 시 (장착)
          dispatch({
            type: EQUIP_ITEM_REQUEST,
            data: {itemId:item.id, itemType:item.type}
          })
        }
    }
  }, [items, equipment]);

  return (
    <>
    <H2>마녀의 옷장</H2>
    <Illust/>
    <HAT>
      <H3>HAT</H3>
      <ItemList>
        {hatItems.map((v, i)=>{
          return (
          <Item onClick={onClickItem(v)} equip={equipment && equipment[v.type]===v.id}>
            <Image thumb={`item_${v.type}_thumb${v.id}.png`}/>
            {items && !items[v.type].includes(v.id) && <div>{v.price}</div>}
            {equipment && equipment[v.type] === v.id && <EquipLabel>장착해제</EquipLabel>}
          </Item>)
        })}
      </ItemList>
    </HAT>
    <HAT>
      <H3>CLOTHES</H3>
      <ItemList>
        {clothesItems.map((v, i)=>{
          return (
          <Item onClick={onClickItem(v)} equip={equipment && equipment[v.type]===v.id}>
            <Image thumb={`item_${v.type}_thumb${v.id}.png`}/>
            {items && !items[v.type].includes(v.id) && <div>{v.price}</div>}
            {equipment && equipment[v.type] === v.id && <EquipLabel>장착해제</EquipLabel>}
          </Item>)
        })}
      </ItemList>
    </HAT>
    <HAT>
      <H3>HAIR</H3>
      <ItemList>
        {hairItems.map((v, i)=>{
          return (
          <Item onClick={onClickItem(v)} equip={equipment && equipment[v.type]===v.id}>
            <Image thumb={`item_${v.type}_thumb${v.id}.png`}/>
            {items && !items[v.type].includes(v.id) && <div>{v.price}</div>}
            {equipment && equipment[v.type] === v.id && <EquipLabel>장착해제</EquipLabel>}
          </Item>)
        })}
      </ItemList>
    </HAT>
    <HAT>
      <H3>BACKGROUND</H3>
      <ItemList>
        {bgItems.map((v, i)=>{
          return (
          <Item onClick={onClickItem(v)} equip={equipment && equipment[v.type]===v.id}>
            <Image thumb={`item_${v.type}_thumb${v.id}.png`}/>
            {items && !items[v.type].includes(v.id) && <div>{v.price}</div>}
            {equipment && equipment[v.type] === v.id && <EquipLabel>장착해제</EquipLabel>}
          </Item>)
        })}
      </ItemList>
    </HAT>
  </>);
};

const Illust = styled.div`
  background: url();
  width: 100%;
  height: 100px;
  background-color: black;
  margin-bottom: 18px;
  border-radius: 20px;
`;

const HAT = styled.div`
`;

const ItemList = styled.ul`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const Item = styled.li`
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  margin: 10px;
  box-sizing: border-box;
  position: relative;
  border: ${props=> props.equip ? `3px solid ${props.theme.purpleLight}`: '0'};
`;

const EquipLabel = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 3px 0;
  background-color: ${props=> props.theme.purpleLight};
  color: white;
  border-radius: 0 0 10px 10px;
  vertical-align: bottom;
`;

const Image = styled.span`
  width: 50px;
  height: 50px;
  margin: 10px 0 0 0;
  display: inline-block;
  background: ${props => `url('/static/img/${props.thumb}')`};
  background-size: contain;
`;

const H3 = styled.h3`
  color: ${props => props.theme.purpleMedium};
`;

export default Shop;
