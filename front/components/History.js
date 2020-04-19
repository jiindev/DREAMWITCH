import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import HistoryItem from './HistoryItem';

const History = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector(state=>state.history);
  
return (
  <>
    <div>
      {histories ? 
        <div>
          {histories.map((c, i)=>{
            return (<HistoryItem history={c}/>)
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
