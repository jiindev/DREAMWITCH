import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import HistoryItem from './HistoryItem';
import { H2 } from './styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_HISTORIES } from "../reducers/character";

const History = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector(state=>state.history);
  
  useEffect(() => {
    dispatch({
      type: SAY_LOAD_HISTORIES,
      data: histories.length
    })
  }, [histories.length]);

return (
  <>
    <HistoryPage>
      <H2>나의 기록</H2>
      {histories ? 
        <div>
          {histories.map((c, i)=>{
            return (<HistoryItem history={c}/>)
          })}
          </div>
      :
      <div>기록된 별이 없습니다.</div>
      }
    </HistoryPage>
  </>
  );
};

const HistoryPage = styled.div`
  width: 100%;
  height: 100%;
`;

export default History;
