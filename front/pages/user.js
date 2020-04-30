import React, { useState, useEffect, useCallback } from "react";
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
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";

const User = ({id}) => {
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

  return (
    <>
      <Wrap>
       <TopContent>
         <UserStatue>
            <Star>{userInfo && userInfo.nickname}</Star><Level>{userInfo && userInfo.level}레벨</Level>
         </UserStatue>
         <LogoutButton onClick={onLogout}><i/></LogoutButton>
          <Character id={id}/>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1}><TabIcon iconName={'star'}/></TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2}><TabIcon iconName={'list'}/></TabItem>
          </ul>
        </Tab>
        </TopContent>
        
        <Page>
          {page === 1 && <TodoList id={id}/>}
          {page === 2 && <History id={id}/>}
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

User.propTypes = {
  id: propTypes.number.isRequired,
}

User.getInitialProps = async (context) => {
  const id = parseInt(context.query.id, 10);
  console.log('user getInitialProps', context.query.id);
  
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id,
  })
  context.store.dispatch({
    type: LOAD_TODOS_REQUEST,
    data: id,
  })
  context.store.dispatch({
    type: LOAD_HISTORIES_REQUEST,
    data: id,
  })
  // context.store.dispatch({
  //   type: LOAD_EQUIPMENT_REQUEST,
  //   data: id,
  // })
  return {id};
}


export default User;
