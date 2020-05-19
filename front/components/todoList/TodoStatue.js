import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {SAY_COMPLETE_TODOS} from '../../reducers/character';
import styled, {keyframes} from 'styled-components';
import propTypes from 'prop-types';

const TodoStatue = ({onClickWriteHistory, writingHistory}) => {
  const dispatch = useDispatch();
  const { clearPercentage, isCleared } = useSelector((state) => state.todo);
  
  useEffect(()=>{
    if(clearPercentage === 100 && isCleared === false){
      dispatch({
        type: SAY_COMPLETE_TODOS
      })
    }
  }, [clearPercentage]);

  return (
    <>
      <TodoStatueBar complete={clearPercentage === 100}>
        <Percentage>
          <p className="topText">{isCleared ? '미션 완료 짝짝짝~' : clearPercentage === 100 ? '달성 완료! 별을 눌러 완료하세요!' : '미션 달성율'}</p>
          <p className="percent">{clearPercentage ? clearPercentage : '0'}%</p>
        </Percentage>
        {(clearPercentage === 100 && !isCleared ) ? 
            <StarButtonActive onClick={onClickWriteHistory} writingHistory={writingHistory}>완료버튼</StarButtonActive> :
            <><StarBase><StarPercentage opacity={clearPercentage+'%'} cleared={isCleared}/></StarBase></>
        }
      </TodoStatueBar>
    </>
  );
};

const TodoStatueBar = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => props.complete ? '110px' : '100px'};
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0 0;
  background-color: ${props => props.complete ? props.theme.purpleDark : props.theme.purpleMedium};
  display: none;
  transition: all .5s ease;
  @media only screen and (min-height: 600px) {
    display: flex;
  }
`;

const Percentage = styled.div`
  flex: 1;
  margin: 25px 0 0 14px;
  & .topText {
    color: white;
    margin-bottom: 8px; 
  }
  & .percent {
    color: ${props => props.theme.yellowMedium};
    font-size: 40px;
  }
`;

const StarBase = styled.div`
  width: 70px;
  height: 70px;
  margin: 15px;
  background: url('/icons/stat_basic_no_move.svg');
  outline: none;
  border: 0;
  position: relative;
`;

export const StarAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
`;

const StarPercentage = styled(StarBase)`
  background: ${props => props.cleared ? "url('/icons/stat_finished.svg')": "url('/icons/stat_star.svg')"};
  position: absolute;
  margin: 0;
  top: 0;
  left: 0;
  opacity: ${props => props.opacity};
`;

const StarButtonActive = styled(StarBase)`
  background: url('/icons/stat_click_to_finish.svg');
  text-indent: -9999px;
  cursor: pointer;
  animation: ${StarAnimation} .5s infinite ease-in-out alternate;
  opacity: ${props=>props.writingHistory ? 0 : 1};
  transition: all .5s ease;
`;

TodoStatue.propTypes = {
  onClickWriteHistory: propTypes.func.isRequired,
  writingHistory: propTypes.bool.isRequired
}

export default TodoStatue;
