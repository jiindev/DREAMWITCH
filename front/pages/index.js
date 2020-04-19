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
import styled from 'styled-components';
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { LOAD_TODOS_REQUEST } from "../reducers/todo";

const Index = ({pageProps}) => {
  const dispatch = useDispatch();
  const { me, logInErrorReason } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    if(!me){
      Router.push('/login');
    }
  }, [me]);

  const onChangePage = useCallback(pageNum => () => {
    if(page!==pageNum){
      setPage(pageNum);
    }
  }, [page]);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }

  return (
    <>
      <>
       <TopContent>
         <UserStatue>
            <span>{me && me.star}별</span><span>{me && me.level}레벨</span>
            <button onClick={onLogout}>로그아웃</button>
         </UserStatue>
          <Character></Character>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1}>투두 리스트</TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2}>히스토리</TabItem>
            <TabItem onClick={onChangePage(3)} active={page===3}>스토어</TabItem>
          </ul>
        </Tab>
        </TopContent>
        <Page>
          {page === 1 && <TodoList {...pageProps}/>}
          {page === 2 && <History/>}
          {page === 3 && <Shop/>}
        </Page>
      </>
    </>
  );
  
};


const Page = styled.div`
  background-color: ${props => props.theme.yellowBright};
`;

const Tab = styled.nav`
  & ul {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
`;

const TabItem = styled.li`
    background-color: ${props => (props.active ? props.theme.yellowBright : props.theme.purpleBright)};
    color: ${props => props.theme.purpleDark};
    padding: 20px 0;
    flex: 0.33333;
    border-radius: 20px 20px 0 0;
    text-align: center;
`;

const TopContent = styled.div`
  position: relative;
`;

const UserStatue = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
`;

Index.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST
  })
  context.store.dispatch({
    type: LOAD_HISTORIES_REQUEST
  })
  context.store.dispatch({
    type: LOAD_TODOS_REQUEST
  })
}


export default Index;
