import styled from 'styled-components';
import React, { useState, useRef, useCallback, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { SAY_RESET } from '../reducers/character';
import { Animated } from 'react-animated-css';
import propTypes from 'prop-types';
import { EDIT_GREETINGS_REQUEST } from '../reducers/user';


const Character = ({id}) => {
  const { character } = useSelector(state=>state.character);
  const { equipment } = useSelector(state=>state.item);
  const { me, userInfo, page } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const timeoutRef = useRef();
  const [editingMode, setEditingMode] = useState(false);
  const [userGreetings, setUserGreetings] = useState(me && me.greetings);
  const greetingsInput = createRef();

  useEffect(() => {
    if (editingMode) {
      greetingsInput.current.focus();
    }
  }, [editingMode]);

  useEffect(()=>{
    if(character.talking || character.emotion || character.effect){
      timeoutRef.current = setTimeout(()=>{
        dispatch({
          type: SAY_RESET
        })
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, [character]);

  const editModeStart = useCallback(() => {
    setEditingMode(true);
  }, []);

  const onChangeGreetings = useCallback(
    (e) => {
      setUserGreetings(e.target.value);
    },
    [userGreetings]
  );

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    if(userGreetings!==me.greetings){
      dispatch({
        type: EDIT_GREETINGS_REQUEST,
        data: {
          greetings: userGreetings,
        },
      });
    }
  }, [me && me.greetings, userGreetings]);

  return (
    <>
      <CharacterDiv index={!id ? equipment ? equipment.bg  : 0 : userInfo && userInfo.Equipment.bg}>
        {!id ? 
          page===4 ? 
            <Talking>
              <p>{editingMode ? <input type="text" value={userGreetings} onChange={onChangeGreetings} onBlur={editModeEnd} ref={greetingsInput} /> : me && me.greetings}<EditButton onClick={editModeStart}/></p>
            </Talking> 
            : 
            character && character.talking && 
            <Talking><p>{character.talking}</p></Talking> 
        : <Talking><p>{userInfo && userInfo.greetings}</p></Talking>}
        <Witch>
          <Cat index={!id ? equipment ? equipment.cat  : 0 : userInfo && userInfo.Equipment.cat}/>
          <Wand index={!id ? equipment ? equipment.wand  : 0 : userInfo && userInfo.Equipment.wand}/>
          <Cloths index={!id ? equipment ? equipment.clothes  : 0 : userInfo && userInfo.Equipment.clothes}/>
          <FrontHat index={!id ? equipment ? equipment.hat : 0 : userInfo && userInfo.Equipment.hat}/>
          <Emotion emotion={!id ? character.emotion ? character.emotion : 'basic' : 'basic'}/>
          <Hair index={!id ? equipment ? equipment.hair  : 0 : userInfo && userInfo.Equipment.hair}/>
          <BackHat index={!id ? equipment ? equipment.hat  : 0 : userInfo && userInfo.Equipment.hat}/>
          {!id &&
            character.effect &&
            <Effect effect={character.effect}/>
          }
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
  width: 240px;
  height: 70px;
  top: 40px;
  left: 43px;
  z-index:10;
  background: ${props=>props.effect === 'none' ? 'none' : `url(/static/img/character_effect_${props.effect}.png)`};
  background-size: contain;
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

const EditButton = styled.button`
  width: 12px;
  height: 12px;
  background: url('/static/icons/chatter_box_edit.svg');
  background-size: contain;
  border: 0;
  outline: none;
  vertical-align: middle;
  margin-left: 5px;
  cursor: pointer;
`;

Character.propTypes = {
  id: propTypes.number
}

export default Character;
