import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";

const TodoStatue = () => {
  const dispatch = useDispatch();
  const [historyContent, setHistoryContent] = useState('');
  const historyContentInput = useRef();
  const { date, clearPercentage } = useSelector((state) => state.todo);

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
    })
  }, [date, historyContent]);
  
  return (
    <>
      <div>
        <div>{clearPercentage}</div>
        {clearPercentage === 100 && (
          <>
            <input
              type="text"
              ref={historyContentInput}
              value={historyContent}
              onChange={onChangeHistoryContent}
            />
            <button onClick={clear}>완료</button>
          </>
        )}
      </div>
    </>
  );
};

export default TodoStatue;
