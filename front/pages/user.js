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
import { Wrap, TopContent, Loading, Level, LogoutButton, TabItem, UserStatue, Tab, Star, UserName } from './index';
import {Helmet} from 'react-helmet';

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
  if(userInfo && userInfo.id !== id || !userInfo){
    return null;
  }
  return (
    <>
    <Helmet
    title={`DREAMWITCH :: ${userInfo && userInfo.nickname}님의 마녀일지`}
    description={userInfo && userInfo.greetings}
    meta={[{
      name: 'description', content: userInfo && userInfo.greetings,
    }, {
      property: 'og:title', content: `DREAMWITCH :: ${userInfo && userInfo.nickname}님의 마녀일지`,
    }, {
      property: 'og:description', content: userInfo && userInfo.greetings,
    }, {
      property: 'og:image', content: '/thumb.jpg'
    }, {
      property: 'og:url', content: `/user/${id}`
    }]}
    />
    <AppLayout>
      <Wrap>
      {historyLoading  && <Loading/>}
       <TopContent>
            <UserStatue>
              {me && 
              <Link href='/'>
                <a><HomeButton>돌아가기</HomeButton></a>
              </Link>
              }
              <UserName>{userInfo && `${userInfo.nickname} (${userInfo.userId})`}</UserName>
              <Level>{userInfo && userInfo.level}</Level>
            </UserStatue>
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
const HomeButton = styled(Star)`
  font-size: 12px;
  &:before{
    width: 12px;
    height: 12px;
    background: url('/icons/friend_back.svg');
    background-size: 14px 14px;
    background-position: center center;
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
