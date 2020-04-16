import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Shop from "../components/Shop";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";

const Index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(!me){
      dispatch({
        type: LOAD_USER_REQUEST
      })
    }
  }, []);

  const onChangePage = useCallback(pageNum => () => {
    setPage(pageNum);
  }, []);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }

  return (
    <>
      <>
       <div><span>{me && me.star}별</span><span>{me && me.level}레벨</span></div>
       <button onClick={onLogout}>로그아웃</button>
        <div>
          <Character></Character>
        </div>
        <nav>
          <ul>
            <li onClick={onChangePage(1)}>투두 리스트</li>
            <li onClick={onChangePage(2)}>히스토리</li>
            <li onClick={onChangePage(3)}>스토어</li>
          </ul>
        </nav>
        <div>
          {page === 1 && (
            <div>
              <TodoList></TodoList>
            </div>
          )}
          {page === 2 && (
            <div>
              <History></History>
            </div>
          )}
          {page === 3 && (
            <div>
              <Shop></Shop>
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default Index;
