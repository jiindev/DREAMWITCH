import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import propTypes from 'prop-types';
import { LOAD_TODOS_REQUEST } from "../reducers/todo";
import { LOAD_HISTORIES_REQUEST, LOAD_USER_HISTORIES_REQUEST } from "../reducers/history";
import AppLayout from "../components/AppLayout";

const User = memo(({id}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    setPage(1);
  }, [id]);

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
  if(userInfo && userInfo.id !== id){
    return null;
  }
  return (
    <>
    <AppLayout>
      <Wrap>
       <TopContent>
        <Link href='/'>
         <GoHome>
            <HomeButton>돌아가기</HomeButton><Level>{userInfo && `${userInfo.nickname} (${userInfo.userId})`}</Level>
         </GoHome>
         </Link>
         <LogoutButton onClick={onLogout}><i/></LogoutButton>
          <Character id={id}/>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1}><TabIcon iconName={'star'}/></TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2}><TabIcon iconName={'list'}/></TabItem>
          </ul>
        </Tab>
        </TopContent>
          {page === 1 && <TodoList id={id}/>}
          {page === 2 && <History id={id}/>}
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
    flex: 0.5;
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

const GoHome = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
  cursor: pointer;
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

const HomeButton = styled(Level)`
border-radius: 0 0 20px 0;
float: left;
& a{
  text-decoration: none;
  color: ${props => props.theme.purpleLight}; 
}
  &:before{
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: red;
    vertical-align: middle;
    margin-right: 5px;
    background: url('/static/icons/friend_back.svg');
    background-size: contain;
    background-repeat: no-repeat;
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

User.propTypes = {
  id: propTypes.number.isRequired,
}

User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id, 10);
  
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  })
  context.store.dispatch({
    type: LOAD_TODOS_REQUEST,
    data: id,
  })
  context.store.dispatch({
    type: LOAD_USER_HISTORIES_REQUEST,
    data: id,
  })
  
  return {id};
}


export default User;
