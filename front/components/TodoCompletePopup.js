import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";
import {SAY_COMPLETE_TODOS} from '../reducers/character';
import styled from 'styled-components';
import { Button } from './styledComponents/PageComponent';

const TodoCompletePopup = ({clear}) => {
  const dispatch = useDispatch();
  const [historyContent, setHistoryContent] = useState('');
  const historyContentInput = useRef();
  const { date, clearPercentage, isCleared } = useSelector((state) => state.todo);
  
  const onChangeHistoryContent = (e) => {
    setHistoryContent(e.target.value);
  }
  
  return (
    <>
      
          <CompletePopUp>
            <div>
              <StarImage/>
              <GetStarText>완료 시 <span>+10</span></GetStarText>
              <HistoryContentInput>
                <div>기념의 한마디를 작성해보세요</div>
                <input
                  type="text"
                  ref={historyContentInput}
                  value={historyContent}
                  placeholder='오늘도 힘냈다! 아자아자!'
                  maxLength='40'
                  onChange={onChangeHistoryContent}
                />
                <span>{historyContent.length}/40</span>
              </HistoryContentInput>
              <CompleteButton onClick={clear(historyContent)}>완료</CompleteButton>
            </div>
          </CompletePopUp>
    </>
  );
};



const CompletePopUp = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 148, .8);
  z-index:99;
  & input {
    opacity: 100%;
  }
  &>div{
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StarImage = styled.span`
  width: 95px;
  height: 95px;
  display: block;
  margin: 40px auto 20px auto;
  background: url('static/icons/stat_finished.svg');
  background-size: contain;
`;

const GetStarText = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: ${props=>props.theme.purpleDark};
  & span{
    font-weight: bold;
    color: black;
    &:before{
      width: 16px;
      height: 16px;
      display: inline-block;
      content: '';
      background: url('/static/icons/check_reward.svg');
      background-size: contain;
      vertical-align: middle;
      margin: -2px 5px 0 5px;
    }
  }
`;

const HistoryContentInput = styled.div`
  margin: 0 15px;
  border-radius: 20px;
  text-align: center;
  background-color: white;
  box-sizing: border-box;
  padding: 0 50px 0 20px;
  position: relative;
  & div{
    background-color: ${props=>props.theme.yellowMedium};
    border-radius: 20px 20px 0 0;
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
    color: ${props=>props.theme.purpleMedium};
    position: absolute;
    top:0;
    left: 0;
  }
  & input{
    outline: 0;
    margin: 50px 0 20px 0;
    border: 0;
    border-bottom: 1px solid ${props=>props.theme.purpleLight};
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    color: ${props=>props.theme.purpleDark};
    font-family: 'GmarketSansMedium';
    &::placeholder{
      color: ${props=>props.theme.purpleMedium};
      opacity: .3;
    }
  }
  & span{
    font-size: 10px;
    color: ${props=>props.theme.purpleLight};
    position: absolute;
    top: 55px;
    right: 15px;
  }
`;

const CompleteButton = styled(Button)`
  width: 150px;
  display: block;
  margin: 20px auto;
`;

export default TodoCompletePopup;
