import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import {hatItems, clothesItems, hairItems, bgItems, wandItems, catItems} from '../static/itemData';
import {H2} from './styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_ITEMS } from "../reducers/character";
import {Animated} from 'react-animated-css';
import ClosetItem from "./ClosetItem";

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
        <Animated animationIn="fadeIn" animationInDelay={50} animationInDuration={500} isVisible={true}>
        <Section>
          <H3 type='hat'>HAT</H3>
          <ItemList>
            {hatItems.map((v, i)=>{
              return <ClosetItem v={v} i={i} key={i}/>
            })}
          </ItemList>
        </Section>
      </Animated>
      <Animated animationIn="fadeIn" animationInDelay={100} animationInDuration={500} isVisible={true}>
      <Section>
        <H3 type='hair'>HAIR</H3>
        <ItemList>
          {hairItems.map((v, i)=>{
            return <ClosetItem v={v} i={i} key={i}/>
          })}
        </ItemList>
      </Section>
      </Animated>
      <Animated animationIn="fadeIn" animationInDelay={150} animationInDuration={500} isVisible={true}>
      <Section>
        <H3 type='clothes'>CLOTHES</H3>
        <ItemList>
          {clothesItems.map((v, i)=>{
            return <ClosetItem v={v} i={i} key={i}/>
          })}
        </ItemList>
      </Section>
      </Animated>
      <Animated animationIn="fadeIn" animationInDelay={200} animationInDuration={500} isVisible={true}>
      <Section>
        <H3 type='background'>BACKGROUND</H3>
        <ItemList>
          {bgItems.map((v, i)=>{
            return <ClosetItem v={v} i={i} key={i}/>
          })}
        </ItemList>
      </Section>
      </Animated>
      <Animated animationIn="fadeIn" animationInDelay={250} animationInDuration={500} isVisible={true}>
      <Section>
        <H3 type='wand'>WAND</H3>
        <ItemList>
          {wandItems.map((v, i)=>{
            return <ClosetItem v={v} i={i} key={i}/>
          })}
        </ItemList>
      </Section>
      </Animated>
      <Animated animationIn="fadeIn" animationInDelay={300} animationInDuration={500} isVisible={true}>
      <Section>
        <H3 type='cat'>CAT</H3>
        <ItemList>
          {catItems.map((v, i)=>{
            return <ClosetItem v={v} i={i} key={i}/>
          })}
        </ItemList>
      </Section>
      </Animated>
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

const Section = styled.div`
  margin: 0 0 40px 0;
`;

const ItemList = styled.ul`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  color: ${props => props.theme.purpleMedium};
  &:before{
    content: '';
    width: 14px;
    height: 14px;
    display: inline-block;
    background: ${props=>`url('/static/icons/shop_${props.type}.svg')`};
    background-size: contain;
    vertical-align: middle;
    margin-right: 10px;
  }
`;

export default Closet;
