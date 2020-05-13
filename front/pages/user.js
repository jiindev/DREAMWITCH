import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import propTypes from 'prop-types';
import { LOAD_TODOS_REQUEST } from "../reducers/todo";
import { LOAD_USER_HISTORIES_REQUEST } from "../reducers/history";
import AppLayout from "../components/AppLayout";
import { Wrap, TopContent, Loading, Level, LogoutButton, TabItem, UserStatue, Tab, TabIcon } from './index';

const User = memo(({id}) => {
  const dispatch = useDispatch();
  const { me, userInfo } = useSelector((state) => state.user);
  const {historyLoading} = useSelector((state)=>state.history);
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
      {historyLoading  && <Loading/>}
       <TopContent>
        <Link href='/'>
         <GoHome>
            {me && <HomeButton>돌아가기</HomeButton>} <Level>{userInfo && `${userInfo.nickname} (${userInfo.userId})`}</Level>
         </GoHome>
         </Link>
         {me && <LogoutButton onClick={onLogout}><i/></LogoutButton>}
          <Character id={id}/>
        <Tab>
          <ul>
            <UserTabItem onClick={onChangePage(1)} active={page===1} iconName={'star'}><i/></UserTabItem>
            <UserTabItem onClick={onChangePage(2)} active={page===2} iconName={'list'}><i/></UserTabItem>
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


const UserTabItem = styled(TabItem)`
    flex: 0.5;
`;

const GoHome = styled(UserStatue)`
  cursor: pointer;
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
    background: url('/icons/friend_back.svg');
    background-size: contain;
    background-repeat: no-repeat;
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
