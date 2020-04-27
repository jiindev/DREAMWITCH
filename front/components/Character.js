import styled from 'styled-components';
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { SAY_RESET } from '../reducers/character';


const Character = () => {
  const { talking } = useSelector(state=>state.character);
  const { equipment } = useSelector(state=>state.item);
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
      <CharacterDiv index={equipment ? equipment.bg  : 0}>
        {talking && <Talking><p>{talking}</p></Talking>}
        <Witch>
          <Cloths index={equipment ? equipment.clothes  : 0}/>
          <FrontHat index={equipment ? equipment.hat : 0}/>
          <Emotion emotion={'mad'}/>
          <Hair index={equipment ? equipment.hair  : 0}/>
          <BackHat index={equipment ? equipment.hat  : 0}/>
          <Effect effect={'happy'}/>
        </Witch>
        {/* {head && <div>{head.itemId}번째 아이템 장착중!</div>} */}
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
  width: 300px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  & div{
    position: absolute;
    background-size: contain;
    opacity: .5;
  }
`;

const Cloths = styled.div`
  bottom: 0;
  left: 54px;
  width: 200px;
  height:85px;
  z-index: 6;
  background: ${props=>`url(/static/img/item_clothes${props.index}.png)`};
`;
const FrontHat = styled.div`
  top: 0;
  left: 20px;
  width: 260px;
  height: 80px;
  z-index: 5;
  background: ${props=>`url(/static/img/item_hat_front${props.index}.png)`};
`;
const Emotion = styled.div`
  top: 30px;
  left:105px;
  width: 90px;
  height: 70px;
  z-index: 4;
  background: ${props=>`url(/static/img/character_emotion_${props.emotion}.png)`};
`;
const Hair = styled.div`
  top: 0;
  left: 54px;
  width: 200px;
  height: 160px;
  z-index: 3;
  background: ${props=>`url(/static/img/item_hair${props.index}.png)`};
`;
const BackHat = styled.div`
  top: 0;
  left: 20px;
  width: 260px;
  height: 160px;
  z-index: 2;
  background: ${props=>`url(/static/img/item_hat_back${props.index}.png)`};
`;
const Effect = styled.div`
  width: 300px;
  height: 120px;
  top: 0;
  left: 0;
  z-index:1;
  background: ${props=>`url(/static/img/character_effect_${props.effect}.png)`};
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
