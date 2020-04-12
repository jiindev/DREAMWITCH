import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Shop from "../components/Shop";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if(!me){
      dispatch({
        type: LOAD_USER_REQUEST
      })
    }
  }, []);

  return (
    <>
      <>
       <div><span>{me && me.star}별</span><span>{me && me.level}레벨</span></div>
        <div>
          <Character></Character>
        </div>
        <div>
          {page === 1 && (
            <div>
              <History></History>
            </div>
          )}
          {page === 2 && (
            <div>
              <TodoList></TodoList>
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
