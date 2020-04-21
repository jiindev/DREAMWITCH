import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";
import {SAY_COMPLETE_TODOS} from '../reducers/character';
import styled from 'styled-components';

const TodoStatue = () => {
  const dispatch = useDispatch();
  const [historyContent, setHistoryContent] = useState('');
  const historyContentInput = useRef();
  const { date, clearPercentage, isCleared } = useSelector((state) => state.todo);
  const [writingHistory, setWritingHistory] = useState(false);

  useEffect(()=>{
    if(clearPercentage === 100 && isCleared === false){
      dispatch({
        type: SAY_COMPLETE_TODOS
      })
    }
  }, [clearPercentage]);

  const onChangeHistoryContent = (e) => {
    setHistoryContent(e.target.value);
  }

  const clear = useCallback(() => {
    dispatch({
      type: ADD_HISTORIES_REQUEST,
      data: {
        date,
        content: historyContent
      }
    });
    setWritingHistory(false);
  }, [date, historyContent]);

  const onClickWriteHistory = () => {
    setWritingHistory(true);
  }
  
  return (
    <>
      <TodoStatueBar complete={clearPercentage === 100}>
        <Percentage>
          <p className="topText">{isCleared ? '미션 완료 짝짝짝~' : clearPercentage === 100 ? '달성 완료! 별을 눌러 완료하세요!' : '미션 달성율'}</p>
          <p className="percent">{clearPercentage ? clearPercentage : '0'}%</p>
        </Percentage>
        {(clearPercentage === 100 && !isCleared ) ? 
            <StarButtonActive onClick={onClickWriteHistory}>완료버튼</StarButtonActive> :
            <StarButton/>
        }
      </TodoStatueBar>
      {writingHistory && 
        <>
          <CompletePopUp>
            <input
                type="text"
                ref={historyContentInput}
                value={historyContent}
                onChange={onChangeHistoryContent}
              />
            <button onClick={clear}>완료</button>
          </CompletePopUp>
        </>
      }
    </>
  );
};

const TodoStatueBar = styled.div`
  position: fixed;
  width: 100%;
  height: ${props => props.complete ? '110px' : '100px'};
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0 0;
  background-color: ${props => props.complete ? props.theme.purpleDark : props.theme.purpleMedium};
  display: flex;
  transition: all .5s ease;
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

const StarButton = styled.button`
  width: 70px;
  height: 70px;
  margin: 15px;
  background: url('/static/icons/stat_basic_no_move.svg');
  outline: none;
  border: 0;
`;

const StarButtonActive = styled(StarButton)`
  width: 70px;
  height: 70px;
  margin: 15px;
  background: url('/static/icons/stat_click_to_finish.svg');
  outline: none;
  border: 0;
  text-indent: -9999px;
  cursor: pointer;
`;

const CompletePopUp = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.yellowLight};
  opacity: 80%;
  & input {
    opacity: 100%;
  }
`;

export default TodoStatue;
