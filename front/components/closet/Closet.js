import React, { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import {hatItems, clothesItems, hairItems, bgItems, wandItems, catItems} from '../data/itemData';
import {H2} from '../styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_ITEMS } from "../../reducers/character";
import ClosetSection from "./ClosetSection";

const Closet = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SAY_LOAD_ITEMS,
    })
  }, []);

  return (
    <>
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

const ClosetPage = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

export default Closet;
