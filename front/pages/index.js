import React, { useEffect, useCallback, memo, useState } from "react";
import Character from "../components/character/Character";
import History from "../components/history/History";
import TodoList from "../components/todoList/TodoList";
import Closet from "../components/closet/Closet";
import Visit from '../components/visit/Visit';
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { LOG_OUT_REQUEST, LEVEL_UP_REQUEST, SET_PAGE, LOAD_RANKING_USERS_REQUEST } from "../reducers/user";
import styled, {keyframes} from 'styled-components';
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { LOAD_TODOS_REQUEST } from "../reducers/todo";
import { LOAD_ITEMS_REQUEST, LOAD_EQUIPMENT_REQUEST } from "../reducers/item";
import { levelCheck } from '../components/data/levelData';
import AppLayout from "../components/AppLayout";
import { SAY_LEVEL_UP } from "../reducers/character";
import LevelUpPopup from "../components/todoList/LevelUpPopup";
import UserSetting from "../components/setting/UserSetting";

const Index = memo(() => {
  const dispatch = useDispatch();
  const { me, page } = useSelector((state) => state.user);
  const {historyLoading} = useSelector((state)=>state.history);
  const [levelUp, setLevelUp] = useState(false);
  const [settingShown, setSettingShown] = useState(false);

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
      });
      dispatch({
        type: SAY_LEVEL_UP
      })
      setLevelUp(true);
      setTimeout(()=>{
        setLevelUp(false);
      }, 2300);
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

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }, []);

  const settingOn = useCallback(() => {
    setSettingShown(true);
  }, []);

  const settingOff = useCallback(()=>{
    setSettingShown(false);
  }, []);

  if(!me){
    return null;
  }
  return (
    <>
    <AppLayout>
      <Wrap>
        {levelUp && <LevelUpPopup/>}
        {historyLoading  && <Loading/>}
        {settingShown && <UserSetting settingOff={settingOff}/>}
       <TopContent>
         <UserStatue>
            <Star>{me && me.star}</Star>
            <UserName>{me && `${me.nickname} (${me.userId})`}<SettingButton onClick={settingShown ? settingOff : settingOn}/></UserName>
            <Level>{me && me.level}</Level>
         </UserStatue>
         <LogoutButton onClick={onLogout}><i/></LogoutButton>
          <Character></Character>
        <Tab>
          <ul>
            <TabItem onClick={onChangePage(1)} active={page===1} iconName={'star'}><i/></TabItem>
            <TabItem onClick={onChangePage(2)} active={page===2} iconName={'list'}><i/></TabItem>
            <TabItem onClick={onChangePage(3)} active={page===3} iconName={'shop'}><i/></TabItem>
            <TabItem onClick={onChangePage(4)} active={page===4} iconName={'friend'}><i/></TabItem>
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

export const LoadingImage = keyframes`
  from {
    background-position: 0 -3 px;
  }
  to {
    background-position: 0 4px;
  }
`;

export const Loading = styled.span`
  width: 50px;
  height: 50px;
  display: block;
  position: absolute;
  z-index: 999;
  border-radius: 100px;
  right: 10px;
  bottom: 10px;
  background: url('/img/loading.gif') ${props=>props.theme.yellowMedium};
  background-size: contain;
  background-repeat: no-repeat;
  animation: ${LoadingImage} .8s infinite ease-in-out alternate;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media only screen and (min-width: 769px) {
    height: 100%;
  }
`;

export const Tab = styled.nav`
  position: relative;
  z-index: 10;
  & ul {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    overflow: hidden;
  }
`;

export const TabItem = styled.li`
    background-color: ${props => (props.active ? props.theme.yellowLight : props.theme.purpleLight)};
    color: ${props => props.theme.purpleDark};
    padding: 12px 0;
    flex: 0.25;
    border-radius: 20px 20px 0 0;
    text-align: center;
    transition: all .2s ease;
    position: relative;
    bottom: 0;
    cursor: pointer;
    & i{
      width: 16px;
      height: 16px;
      background: ${props => `url('/icons/tabbutton_${props.iconName}.svg')`};
      display: inline-block;
    }
    &:hover{
      bottom:${props => props.active ? '0px' : '-5px'};
    }
`;

export const TopContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const UserStatue = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
`;

export const UserName = styled.span`
  background-color: ${props => props.theme.purpleDark}; 
  color: ${props => props.theme.purpleLight}; 
  font-size: 12px;
  padding: 10px 15px;
  display: inline-block;
  border-radius: 0 0 0 20px;
  position: absolute;
  top: 0;
  right: 0;
`;
const SettingButton = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-left: 5px;
    background: url('/icons/me_setting.svg');
    background-size: contain;
    cursor: pointer;
`;

export const Level = styled.span`
  background-color: ${props => props.theme.purpleMedium}; 
  color: #e995fc; 
  font-size: 12px;
  padding: 10px 12px;
  display: inline;
  border-radius: 0 0 0 20px;
  position: absolute;
  top: 32px;
  right: 0;
`;

export const Star = styled(Level)`
background-color: ${props => props.theme.purpleDark}; 
color: ${props => props.theme.purpleLight}; 
border-radius: 0 0 20px 0;
position: absolute;
top: 0;
left: 0;
right: auto;
  &:before{
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-right: 5px;
    background: url('/icons/top_left_star.svg');
    background-size: contain;
  }
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 32px;
  left: -6px;
  z-index: 98;
  width: 40px;
  height: 34px;
  background-color: ${props => props.theme.purpleLight}; 
  outline: none;
  border: 0;
  border-radius: 0 0 20px 0;
  cursor: pointer;
  transition: all .2s ease;
  & i{
    width: 16px;
    height: 16px;
    background-image: url('/icons/logout.svg');
    display: inline-block;
  }
  &:hover{
    background-color: ${props => props.theme.purpleLightHover}; 
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
    type: LOAD_RANKING_USERS_REQUEST
  })
}


export default Index;
