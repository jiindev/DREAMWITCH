import styled from 'styled-components';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { SAY_RESET } from '../reducers/character';


const Character = ({id}) => {
  const { talking } = useSelector(state=>state.character);
  const { equipment } = useSelector(state=>state.item);
  const { userInfo } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  useEffect(()=>{
    if(talking){
      timeoutRef.current = setTimeout(()=>{
        dispatch({
          type: SAY_RESET
        })
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, [talking]);

  return (
    <>
      <CharacterDiv index={!id ? equipment ? equipment.bg  : 0 : userInfo && userInfo.Equipment.bg}>
        {!id ? talking && <Talking><p>{talking}</p></Talking> : <Talking><p>{userInfo.greetings}</p></Talking>}
        <Witch>
          <Cat index={!id ? equipment ? equipment.cat  : 0 : userInfo && userInfo.Equipment.cat}/>
          <Wand index={!id ? equipment ? equipment.wand  : 0 : userInfo && userInfo.Equipment.wand}/>
          <Cloths index={!id ? equipment ? equipment.clothes  : 0 : userInfo && userInfo.Equipment.clothes}/>
          <FrontHat index={!id ? equipment ? equipment.hat : 0 : userInfo && userInfo.Equipment.hat}/>
          <Emotion emotion={'basic'}/>
          <Hair index={!id ? equipment ? equipment.hair  : 0 : userInfo && userInfo.Equipment.hair}/>
          <BackHat index={!id ? equipment ? equipment.hat  : 0 : userInfo && userInfo.Equipment.hat}/>
          <Effect effect={'none'}/>
        </Witch>
      </CharacterDiv>
    </>
  );
};

const CharacterDiv = styled.div`
  background: ${props=>`url(/static/img/item_bg${props.index}.png)`};
  background-size: 50px 50px;
  height: 200px;
  text-align: center;
  position: relative;
`;

const Witch = styled.div`
  width: 326px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  & div{
    position: absolute;
    background-size: contain;
  }
`;

const Wand = styled.div`
  bottom: 0;
  left: 136px;
  width: 150px;
  height:160px;
  z-index: 7;
  background: ${props=>`url(/static/img/item_wand${props.index}.png)`};
`;

const Cat = styled.div`
  bottom: 0;
  left: 27px;
  width: 110px;
  height:120px;
  z-index: 7;
  background: ${props=>props.index===0?'none' : `url(/static/img/item_cat${props.index}.png)`};
`;

const Cloths = styled.div`
  bottom: 0;
  left: 56px;
  width: 220px;
  height:100px;
  z-index: 6;
  background: ${props=>props.index===0?'none' : `url(/static/img/item_clothes${props.index}.png)`};
`;
const FrontHat = styled.div`
  top: 0;
  left: 40px;
  width: 244px;
  height: 90px;
  z-index: 5;
  background: ${props=>props.index===0?'none' : `url(/static/img/item_hat_front${props.index}.png)`};
`;
const Emotion = styled.div`
  top: 30px;
  left:114px;
  width: 100px;
  height: 70px;
  z-index: 4;
  background: ${props=>`url(/static/img/character_emotion_${props.emotion}.png)`};
`;
const Hair = styled.div`
  top: 0;
  left: 53px;
  width: 220px;
  height: 200px;
  z-index: 3;
  background: ${props=>`url(/static/img/item_hair${props.index}.png)`};
`;
const BackHat = styled.div`
  top: 0;
  left: 47px;
  width: 236px;
  height: 200px;
  z-index: 2;
  background: ${props=>props.index===0?'none' : `url(/static/img/item_hat_back${props.index}.png)`};
`;
const Effect = styled.div`
  width: 140px;
  height: 70px;
  top: 40px;
  left: 43px;
  z-index:1;
  background: ${props=>props.effect === 'none' ? 'none' : `url(/static/img/character_effect_${props.effect}.png)`};
`;

const Talking = styled.div`
  width: 100%;
  position: absolute;
  bottom: 55px;
  z-index: 10;
  & p {
    color: ${props => props.theme.purpleDark};
    margin: 0 15px;
    background-color: white;
    border-radius: 20px;
    padding: 13px 0;
    font-family: 'CookieRun-Regular';
    font-size: 12px;
  }
  
`;

export default Character;
