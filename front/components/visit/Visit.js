import React, { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import {H2} from '../styledComponents/PageComponent';
import styled from 'styled-components';
import AddFriend from "./AddFriend";
import UserList from './UserList';

const Visit = memo(() => {
  const [editingMode, setEditingMode] = useState(false);
  const { me, userRanking } = useSelector(state=>state.user);

  const onEditMode = useCallback(() => {
    if(editingMode){
        return setEditingMode(false);
    }
    return setEditingMode(true);
  }, [editingMode]);

  return (
    <>
    <VisitPage>
        <H2>놀러가기<EditButton editingMode={editingMode} onClick={onEditMode}>수정모드</EditButton></H2>
        <AddFriend/>
        <UserList title='나의 동료 목록' users={me && me.Followings} editingMode={editingMode}/>
        {userRanking && userRanking[0] && !editingMode &&
        <UserList title='마녀 순위' users={userRanking}/>
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
    background: ${props=>props.editingMode ? "url('/icons/friend_setting_on.svg')" : "url('/icons/friend_setting_off.svg')"};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    text-indent: -9999px;
    border: 0;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
`;


export default Visit;
