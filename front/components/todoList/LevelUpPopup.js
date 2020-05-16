import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Animated} from 'react-animated-css';
import styled from 'styled-components';
import { levelCheck } from '../data/levelData';
import { GetStarText } from "./TodoCompletePopup";


const LevelUpPopup = () => {
    const { me } = useSelector((state) => state.user);
    const [disappear, setDisappear] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setDisappear(true);
        }, 1500)
    }, []);

    return (
        <PopUp>
          <Animated animationIn="bounceIn" animationInDuration={800} animationOut="bounceOut" animationOutDuration={800} isVisible={!disappear}>
              <div>
                <h4>LEVEL UP!</h4>
                <p><span>{levelCheck(me.exp)}</span>로 레벨업!</p>
                <GetStarText><span>+10</span></GetStarText>
              </div>
          </Animated>
        </PopUp>
    );
};

export const PopUp = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 10px;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  &>div>div{
    background-color: ${props=>props.theme.yellowMedium};
    width: 200px; 
    height: 200px;
    border-radius: 20px;
    padding-top: 20px;
    &:before{
    width: 100px;
    height: 100px;
    content: '';
    display: block;
    background: url('/img/level_up.png') white;
    background-size: contain;
    background-position: center 20px;
    background-repeat: no-repeat;
    border-radius: 50px;
    margin: 0 auto 10px auto;
    }
    & h4{
      color: ${props=>props.theme.purpleMedium};
      font-size: 20px;
      font-weight: 900;
      text-align: center;
    }
    & p{
      color: ${props=>props.theme.purpleDark};
      text-align: center;
      margin: 5px 0;
      & span{
        color: ${props=>props.theme.purpleMedium};
      }
    }
  }
  
`;

export default LevelUpPopup;