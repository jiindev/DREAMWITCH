import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Shop from "../components/Shop";
import Visit from '../components/Visit';
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { LOAD_TODOS_REQUEST } from "../reducers/todo";
import { LOAD_ITEMS_REQUEST } from "../reducers/item";

const Index = () => {
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
      <Wrap>
       <TopContent>
         <UserStatue>
            <Star>{me && me.star}</Star><Level>{me && me.level}레벨</Level>
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
        
        <Page>
          {page === 1 && <TodoList/>}
          {page === 2 && <History/>}
          {page === 3 && <Shop/>}
          {page === 4 && <Visit/>}
        </Page>
        </Wrap>
    </>
  );
  
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;


const Page = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
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
    flex: 0.33333;
    border-radius: 20px 20px 0 0;
    text-align: center;
    transition: all .2s ease;
    cursor: pointer;
`;

const TabIcon = styled.i`
  width: 16px;
  height: 16px;
  background: ${props => `url('/static/icons/tabbutton_${props.iconName}.svg')`};
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
    background: url('/static/icons/top_left_star.svg');
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
    background-image: url('/static/icons/back_to_home.svg');
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
}


export default Index;
