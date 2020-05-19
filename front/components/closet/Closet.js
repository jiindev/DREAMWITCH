import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import {hatItems, clothesItems, hairItems, bgItems, wandItems, catItems} from '../data/itemData';
import {H2} from '../styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_ITEMS } from "../../reducers/character";
import ClosetSection from "./ClosetSection";
import {Button} from '../styledComponents/PageComponent';

const Closet = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SAY_LOAD_ITEMS,
    })
  }, []);


  return (
    <>
    <BuyPopup>
        <div>
          <span/><p>별 99개로 잠금해제 하시겠습니까?</p>
          <div>
          <PopupButton>예</PopupButton>
          <PopupButton>아니요</PopupButton>
          </div>
        </div>
    </BuyPopup>
    <ClosetPage>
      <H2>마녀의 옷장</H2>
      <ClosetSection title="HAT" iconName='hat' itemsData={hatItems} delay={50}/>
      <ClosetSection title="HAIR" iconName='hair' itemsData={hairItems} delay={100}/>
      <ClosetSection title="CLOTHES" iconName='clothes' itemsData={clothesItems} delay={150}/>
      <ClosetSection title="BACKGROUND" iconName='background' itemsData={bgItems} delay={200}/>
      <ClosetSection title="WAND" iconName='wand' itemsData={wandItems} delay={250}/>
      <ClosetSection title="CAT" iconName='cat' itemsData={catItems} delay={300}/>
    </ClosetPage>
  </>);
});

const BuyPopup = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: none;
  &>div{
    padding: 15px 30px;
    border-radius: 20px 20px 0 0;
    background: ${props=>props.theme.yellowMedium};
    display: flex;
    align-items: center;
    flex-direction: row;
    & p{
      color: ${props=>props.theme.purpleDark};
      display: inline-block;
    }
    &>div{
      margin-left: auto;
    }
  }
  & span{
    width: 30px;
    height: 30px;
    background: url('/img/item_hat_thumb2.png') #ffffff;
    background-size: contain;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
`
const PopupButton = styled(Button)`
  padding: 8px 16px;
  width: auto;
  margin: 0 5px;
  font-size: 14px;
`;

const ClosetPage = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  height: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

export default Closet;
