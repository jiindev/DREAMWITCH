import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {H2} from './styledComponents/PageComponent';
import styled from 'styled-components';
import { REMOVE_FOLLOWING_REQUEST, LOAD_RECENT_USERS_REQUEST, LOAD_TODAY_USERS_REQUEST } from "../reducers/user";
import Link from 'next/link';
import {Animated} from 'react-animated-css';
import AddFriend from "./AddFriend";

const Visit = memo(() => {
  const dispatch = useDispatch();
  const [editingMode, setEditingMode] = useState(false);
  const { me, todayUsers } = useSelector(state=>state.user);
  
  const onEditMode = useCallback(() => {
    if(editingMode){
        return setEditingMode(false);
    }
    return setEditingMode(true);
  }, [editingMode]);

  const onRemoveFriend = useCallback((id) => ()=>{
   dispatch({
       type: REMOVE_FOLLOWING_REQUEST,
       data: id
   })
  }, [me && me.Followings]);


  return (
    <>
    <VisitPage>
    <H2>놀러가기<EditButton on={editingMode.toString()} onClick={onEditMode}>수정모드</EditButton></H2>
    <AddFriend/>
    <FriendList>
        <h3>나의 동료 목록</h3>
        {me && me.Followings[0] ? me.Followings.map((v, i)=>{
            return (
            <Animated animationIn="fadeInUp" animationInDelay={i*100} animationInDuration={500} isVisible={true} key={i}>
              <li>
                {v.nickname}<span>({v.userId})</span>
                {editingMode ? 
                  <DeleteButton onClick={onRemoveFriend(v.id)}>친구삭제</DeleteButton> 
                  : <Link href={{pathname: '/user', query:{id:v.id}}} as={`/user/${v.id}`}><VisitButton>방문하기</VisitButton></Link>}
              </li>
            </Animated>);
        })
        : 
        <NoFriend>동료 목록에 추가한 마녀가 없습니다.</NoFriend>
    }
    </FriendList>
    {todayUsers && todayUsers[0] && !editingMode &&
        <TodayList>
        <h3>오늘의 마녀</h3>
        {todayUsers.map((v, i)=>{
                return (
                <Animated animationIn="fadeInUp" animationInDelay={i*100} animationInDuration={500} isVisible={true} key={i}>
                <li>
                    {v.nickname}<span>({v.userId})</span>
                    {me && me.id !== v.id  && <Link href={{pathname: '/user', query:{id:v.id}}} as={`/user/${v.id}`}><VisitButton>방문하기</VisitButton></Link>}
                </li>
                </Animated>);
            })}
        </TodayList>
    }
    </VisitPage>
  </>);
});

const VisitPage = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
`;

const EditButton = styled.button`
    float: right;
    width: 15px;
    height: 15px;
    background: ${props=>props.on ? "url('/static/icons/friend_setting_on.svg')" : "url('/static/icons/friend_setting_off.svg')"};
    background-size: contain;
    text-indent: -9999px;
    border: 0;
    vertical-align: middle;
    outline: none;
`;

const FriendList = styled.ul`
    & li {
        background-color: ${props=>props.theme.yellowMedium};
        padding: 14px 20px;
        border-radius: 20px;
        margin: 20px 0;
        color: ${props=>props.theme.purpleDark};
        & span{
            color: ${props=>props.theme.purpleMedium};
        }
    }
    & h3{
        color: ${props => props.theme.purpleMedium};
        margin : 30px 10px 10px 10px;
    }
`;

const NoFriend = styled.div`
  text-align: center;
  color: ${props => props.theme.yellowDark};
  font-size: 12px;
`;

const TodayList = styled(FriendList)``;
const VisitButton = styled.span`
    float: right;
    width: 16px;
    height: 16px;
    margin-top: -2px;
    background: url('/static/icons/friend_list_house.svg');
    background-size: contain;
    background-repeat: no-repeat;
    text-indent: -9999999px;
`;

const DeleteButton = styled(VisitButton)`
    background: url('/static/icons/friend_delete.svg');
`;

export default Visit;
