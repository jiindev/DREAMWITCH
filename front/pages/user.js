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

const User = ({id}) => {
  const dispatch = useDispatch();
  const { me, logInErrorReason } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);

  useEffect(()=>{
    if(!me){
      Router.push('/login');
    };
    alert(id);
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
            <span>{me && me.star}별</span><span>{me && me.level}레벨</span>
            <button onClick={onLogout}>로그아웃</button>
         </UserStatue>
          <Character></Character>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1}><TabIcon iconName={'star'}/></TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2}><TabIcon iconName={'list'}/></TabItem>
          </ul>
        </Tab>
        </TopContent>
        
        <Page>
          {page === 1 && <TodoList/>}
          {page === 2 && <History/>}
          {page === 3 && <Shop/>}
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
  overflow: scroll;
  position: relative;
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

const UserStatue = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
`;

User.getInitialProps = async (context) => {
  return {id:parseInt(context.query.id,10)};
}


export default User;
