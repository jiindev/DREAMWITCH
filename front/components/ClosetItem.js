import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BUY_ITEM_REQUEST, EQUIP_ITEM_REQUEST, UNEQUIP_ITEM_REQUEST } from "../reducers/item";
import styled from 'styled-components';
import {Animated} from 'react-animated-css';
import propTypes from 'prop-types';

const ClosetItem = ({v, i}) => {
    const dispatch = useDispatch();
    const { items, equipment } = useSelector(state=>state.item);
    const { me } = useSelector(state=>state.user);

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

    return(
    <Animated animationIn="fadeInUp" animationInDelay={i*50} isVisible={true}>
        <Item onClick={onClickItem(v)} equip={equipment && equipment[v.type]===v.id}>
        {items && !items[v.type].includes(v.id) && <LockIcon/>}
        <Image thumb={`item_${v.type}_thumb${v.id}.png`}/>
        {items && !items[v.type].includes(v.id) && <Price>{v.price}</Price>}
        {equipment && equipment[v.type] === v.id && <EquipLabel>장착해제</EquipLabel>}
        </Item>
    </Animated>
    );
};

const Item = styled.li`
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  margin: 10px;
  box-sizing: border-box;
  position: relative;
  border: ${props=> props.equip ? `3px solid ${props.theme.purpleLight}`: `3px solid ${props.theme.yellowMedium}`};
`;

const LockIcon = styled.span`
  width: 14px;
  height: 16px;
  display: inline-block;
  background: url('/static/icons/item_lock.svg');
  position: absolute;
  top: 10px;
  left: 10px;
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

const Price = styled.div`
margin-top: 5px;
  &:before{
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    background: url('/static/icons/top_left_star.svg');
    background-size: contain;
    vertical-align: middle;
    margin-right: 3px;
  }
`;

ClosetItem.propTypes = {
    v: propTypes.object.isRequired,
    i: propTypes.number.isRequired
}

export default ClosetItem;