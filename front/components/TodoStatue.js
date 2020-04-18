import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";
import {SAY_COMPLETE_TODOS} from '../reducers/character';

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
      <div>
        <div>{clearPercentage}</div>
        {(clearPercentage === 100 && !isCleared ) && 
          <>
            <button onClick={onClickWriteHistory}>구슬버튼</button>
          </>
        }
      </div>
      {writingHistory && 
        <>
          <input
              type="text"
              ref={historyContentInput}
              value={historyContent}
              onChange={onChangeHistoryContent}
            />
            <button onClick={clear}>완료</button>
        </>
      }
    </>
  );
};

export default TodoStatue;
