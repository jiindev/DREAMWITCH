import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";

const History = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector(state=>state.history);

  useEffect(() => {
    dispatch({
      type: LOAD_HISTORIES_REQUEST
    })
  }, []);
  
return (
  <>
    <div>
      {histories ? 
        <div>
          {histories.map((c, i)=>{
            return (
            <>
              <div><b>{c.content}</b></div>
              <div>
                {c.Todos.map((todo, i)=>{
                  return <div>{todo.content}</div>
                })}
              </div>
              <span>{c.date}</span>
              <br/><br/>
            </>)
          })}
          </div>
      :
      <div>기록된 별이 없습니다.</div>
      }
    </div>
  </>
  );
};

export default History;
