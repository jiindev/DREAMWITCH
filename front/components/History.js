import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import HistoryItem from './HistoryItem';
import { H2 } from './styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_HISTORIES } from "../reducers/character";
import {Animated} from 'react-animated-css';

const History = ({id}) => {
  const dispatch = useDispatch();
  const { histories, userHistories } = useSelector(state=>state.history);
  const {userInfo} = useSelector(state=>state.user);

  useEffect(() => {
    if(!id){
      dispatch({
        type: SAY_LOAD_HISTORIES,
        data: histories.length
      })
    }
  }, [histories.length]);

return (
  <>
    <HistoryPage>
      {id?
        <>
        <H2>{userInfo && userInfo.nickname}의 기록</H2>
        {userHistories ? 
            <div>
              {userHistories.map((c, i)=>{
                if(i===userHistories.length-1){
                  return (<HistoryItem history={c} lastChild={true} userHistory={true}/>)
                }else{
                  return (<HistoryItem history={c} userHistory={true}/>)
                }
              })}
              </div>
          :
          <div>기록된 별이 없습니다.</div>
          }
        </>
      :
        <>
          <H2>나의 기록</H2>
          {histories ? 
            <div>
              {histories.map((c, i)=>{
                return(
                  <Animated animationIn="fadeIn" animationInDelay={i*100} animationInDuration={500} isVisible={true}>
                  {
                  i===histories.length-1 ? <HistoryItem history={c} lastChild={true}/> : <HistoryItem history={c}/>
                  }
                  </Animated>
                )
              })}
              </div>
          :
          <div>기록된 별이 없습니다.</div>
          }
        </>
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
