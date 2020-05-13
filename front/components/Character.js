import styled from 'styled-components';
import React, { useRef, useEffect, memo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAY_RESET } from '../reducers/character';
import { Animated } from 'react-animated-css';
import propTypes from 'prop-types';
import TalkingBox from './TalkingBox';

const Character = memo(({id}) => {
  const { character } = useSelector(state=>state.character);
  const { equipment } = useSelector(state=>state.item);
  const { userInfo } = useSelector(state=>state.user);
  const { isCleared, todos } = useSelector(state=>state.todo);
  const dispatch = useDispatch();
  const timeoutRef = useRef();
 
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

  return (
    <>
      <CharacterDiv index={!id ? equipment ? equipment.bg  : 0 : userInfo && userInfo.Equipment.bg}>
        <TalkingBox id={id}/>
        <Witch>
          <Cat index={!id ? //id 유무 체크
                      equipment && equipment.cat // 자신의 정보
                      : userInfo && userInfo.Equipment.cat} //다른 유저의 정보 
                      />
          <Wand index={!id ? 
                      equipment && equipment.wand 
                      : userInfo && userInfo.Equipment.wand}/>
          <Cloths index={!id ? 
                        equipment && equipment.clothes 
                        : userInfo && userInfo.Equipment.clothes}/>
          <FrontHat index={!id ? 
                          equipment && equipment.hat
                          : userInfo && userInfo.Equipment.hat}/>
          <Emotion emotion={!id ? 
                            character.emotion ? character.emotion : 'basic' 
                            : isCleared && isCleared ? 'happy' : todos && todos[0] ? 'basic' : 'soso'}/>
          <Hair index={!id ? 
                      equipment && equipment.hair
                      : userInfo && userInfo.Equipment.hair}/>
          <BackHat index={!id ? 
                          equipment && equipment.hat
                          : userInfo && userInfo.Equipment.hat}/>
          {!id &&
            character.effect &&
            <Effect effect={character.effect}/>
          }
        </Witch>
      </CharacterDiv>
    </>
  );
});

const CharacterDiv = styled.div`
  background: ${props=>!props.index?`url(/img/item_bg0.png)` : `url(/img/item_bg${props.index}.png)`};
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
  background: ${props=>!props.index?'none' : `url(/img/item_wand${props.index}.png)`};
`;

const Cat = styled.div`
  bottom: 0;
  left: 27px;
  width: 110px;
  height:120px;
  z-index: 7;
  background: ${props=>!props.index?'none' : `url(/img/item_cat${props.index}.png)`};
`;

const Cloths = styled.div`
  bottom: 0;
  left: 56px;
  width: 220px;
  height:100px;
  z-index: 6;
  background: ${props=>!props.index?'none' : `url(/img/item_clothes${props.index}.png)`};
`;
const FrontHat = styled.div`
  top: 0;
  left: 40px;
  width: 244px;
  height: 90px;
  z-index: 5;
  background: ${props=>!props.index?'none' : `url(/img/item_hat_front${props.index}.png)`};
`;
const Emotion = styled.div`
  top: 30px;
  left:114px;
  width: 100px;
  height: 70px;
  z-index: 4;
  background: ${props=>`url(/img/character_emotion_${props.emotion}.png)`};
`;
const Hair = styled.div`
  top: 0;
  left: 53px;
  width: 220px;
  height: 200px;
  z-index: 3;
  background: ${props=>!props.index?`url(/img/item_hair0.png)` : `url(/img/item_hair${props.index}.png)`};
`;
const BackHat = styled.div`
  top: 0;
  left: 47px;
  width: 236px;
  height: 200px;
  z-index: 2;
  background: ${props=>!props.index?'none' : `url(/img/item_hat_back${props.index}.png)`};
`;
const Effect = styled.div`
  width: 240px;
  height: 70px;
  top: 40px;
  left: 43px;
  z-index:10;
  background: ${props=>props.effect === 'none' ? 'none' : `url(/img/character_effect_${props.effect}.png)`};
  background-size: contain;
`;

Character.propTypes = {
  id: propTypes.number
}

export default Character;
