import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Closet from "../components/Closet";
import Visit from '../components/Visit';
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST, LEVEL_UP_REQUEST, SET_PAGE, LOAD_TODAY_USERS_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { LOAD_TODOS_REQUEST } from "../reducers/todo";
import { LOAD_ITEMS_REQUEST, LOAD_EQUIPMENT_REQUEST } from "../reducers/item";
import { levelCheck } from '../components/data/levelData';
import AppLayout from "../components/AppLayout";

const Index = memo(() => {
  const dispatch = useDispatch();
  const { me, logInErrorReason, page } = useSelector((state) => state.user);

  useEffect(()=>{
    if(!me){
      Router.push('/login');
    }
  }, [me]);

  useEffect(()=>{
    if(me && me.level !== levelCheck(me.exp)){
      dispatch({
        type: LEVEL_UP_REQUEST,
        data: {
          level: levelCheck(me.exp),
        }
      })
    }
  }, [me && me.exp]);
  const onChangePage = useCallback(pageNum => () => {
    if(page!==pageNum){
      dispatch({
        type: SET_PAGE,
        data: pageNum
      })
    }
  }, [page]);

  const onLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }

  const gg = () => {
    console.log('ggsg');
  }

  if(!me){
    return null;
  }
  return (
    <>
    <AppLayout>
      <Wrap>
       <TopContent>
         <UserStatue>
            <Star>{me && me.star}</Star><Level>{me && me.level}</Level>
         </UserStatue>
         <LogoutButton onClick={onLogout}><i/></LogoutButton>
          <Character></Character>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1}><TabIcon iconName={'star'}/></TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2}><TabIcon iconName={'list'}/></TabItem>
            <TabItem onClick={onChangePage(3)} active={page===3}><TabIcon iconName={'shop'}/></TabItem>
            <TabItem onClick={onChangePage(4)} active={page===4}><TabIcon iconName={'friend'}/></TabItem>
          </ul>
        </Tab>
        </TopContent>
          {page === 1 && <TodoList/>}
          {page === 2 && <History/>}
          {page === 3 && <Closet/>}
          {page === 4 && <Visit/>}
        </Wrap>
        </AppLayout>
    </>
  );
  
});

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media only screen and (min-width: 769px) {
    height: 100%;
  }
`;

const Tab = styled.nav`
  position: relative;
  z-index: 10;
  & ul {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
`;

const TabItem = styled.li`
    background-color: ${props => (props.active ? props.theme.yellowLight : props.theme.purpleLight)};
    color: ${props => props.theme.purpleDark};
    padding: 12px 0;
    flex: 0.25;
    border-radius: 20px 20px 0 0;
    text-align: center;
    transition: all .2s ease;
    cursor: pointer;
`;

const TabIcon = styled.i`
  width: 16px;
  height: 16px;
  background: ${props => `url('/icons/tabbutton_${props.iconName}.svg')`};
  display: inline-block;
`;

const TopContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const UserStatue = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
`;

const Level = styled.span`
  background-color: ${props => props.theme.purpleDark}; 
  color: ${props => props.theme.purpleLight}; 
  font-size: 12px;
  padding: 10px 15px;
  display: inline-block;
  border-radius: 0 0 0 20px;
  float: right;
`;

const Star = styled(Level)`
border-radius: 0 0 20px 0;
float: left;
  &:before{
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: red;
    vertical-align: middle;
    margin-right: 5px;
    background: url('/icons/top_left_star.svg');
    background-size: contain;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 98;
  width: 40px;
  height: 34px;
  background-color: ${props => props.theme.purpleLight}; 
  outline: none;
  border: 0;
  border-radius: 0 0 0 20px;
  & i{
    width: 16px;
    height: 16px;
    background-image: url('/icons/back_to_home.svg');
    display: inline-block;
  }
`;

Index.getInitialProps = async (context) => {
  context.store.dispatch({
    type: LOAD_HISTORIES_REQUEST
  })
  context.store.dispatch({
    type: LOAD_TODOS_REQUEST
  })
  context.store.dispatch({
    type: LOAD_ITEMS_REQUEST
  })
  context.store.dispatch({
    type: LOAD_EQUIPMENT_REQUEST
  })
  context.store.dispatch({
    type: LOAD_TODAY_USERS_REQUEST
  })
}


export default Index;
