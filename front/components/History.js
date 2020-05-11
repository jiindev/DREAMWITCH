import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST, LOAD_USER_HISTORIES_REQUEST } from "../reducers/history";
import HistoryItem from './HistoryItem';
import { H2 } from './styledComponents/PageComponent';
import styled from 'styled-components';
import { SAY_LOAD_HISTORIES } from "../reducers/character";
import {Animated} from 'react-animated-css';
import propTypes from 'prop-types';
import { SET_PAGE } from "../reducers/user";

const History = memo(({id}) => {
  const dispatch = useDispatch();
  const { histories, userHistories, hasMoreHistories } = useSelector(state=>state.history);
  const {userInfo} = useSelector(state=>state.user);
  const historyPageRef = useRef();
  const countRef = useRef([]);

  useEffect(() => {
    if(!id){
      dispatch({
        type: SAY_LOAD_HISTORIES,
        data: histories.length
      })
    }
  }, [histories.length]);


  const onScroll = useCallback(() => {
    if((historyPageRef.current.scrollTop + historyPageRef.current.clientHeight + 100) > historyPageRef.current.scrollHeight){
      if(hasMoreHistories){
        const lastId = histories[histories.length-1].id;
        if(!countRef.current.includes(lastId)){
          if(id){
            dispatch({
              type: LOAD_USER_HISTORIES_REQUEST,
              lastId,
              data: id
            })
          }else {
            dispatch({
              type: LOAD_HISTORIES_REQUEST,
              lastId
            })
          }
        }
        countRef.current.push(lastId);
      }
    }
  }, [hasMoreHistories, histories.length]);

return (
  <>
    <HistoryPage onScroll={onScroll} ref={historyPageRef}>
        <H2>{id ? userInfo && userInfo.nickname : '나'}의 기록</H2>
        {histories && histories[0] ? 
            <div>
              {histories.map((c, i)=>{
                return(
                  <Animated animationIn="fadeIn" animationInDelay={ i<5 ? i*100 : 0} animationInDuration={500} isVisible={true} key={i}>
                  <HistoryItem history={c} lastChild={i===histories.length-1}/>
                  </Animated>
                )
              })}
              </div>
          :
          <NoHistory>기록된 별이 없습니다.</NoHistory>
          }
    </HistoryPage>
  </>
  );
});

const HistoryPage = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const NoHistory = styled.div`
  text-align: center;
  color: ${props => props.theme.yellowDark};
  font-size: 12px;
`;

History.propTypes = {
  id: propTypes.number
}


export default History;
