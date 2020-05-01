import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {H2} from './styledComponents/PageComponent';
import styled from 'styled-components';
import { LOAD_FRIENDS_REQUEST, REMOVE_FRIEND_REQUEST, ADD_FRIEND_REQUEST } from "../reducers/user";
import Link from 'next/link';

const Visit = () => {
  const dispatch = useDispatch();
  const [editingMode, setEditingMode] = useState(false);
  const { friends } = useSelector(state=>state.user);
  const [friendId, setFriendId] = useState('');
  
  useEffect(() => {
    dispatch({
        type: LOAD_FRIENDS_REQUEST
    })
  }, []);

  const onEditMode = useCallback(() => {
    if(editingMode){
        return setEditingMode(false);
    }
    return setEditingMode(true);
  }, [editingMode]);

  const onRemoveFriend = useCallback((id) => ()=>{
   dispatch({
       type: REMOVE_FRIEND_REQUEST,
       data: id
   })
  }, [friends]);

  const onAddFriend = useCallback(()=>{
    dispatch({
        type: ADD_FRIEND_REQUEST,
        data: friendId
    })
   }, [friendId]);

   const onChangeFriendId = useCallback((e)=>{
    setFriendId(e.target.value);
   }, [friendId]);

  return (
    <>
    <H2>놀러가기<EditButton on={editingMode} onClick={onEditMode}>수정모드</EditButton></H2>
    <AddFriend>
        <input type="text" placeholder="친구 목록에 추가할 아이디를 입력하세요" value={friendId} onChange={onChangeFriendId}/>
        <button onClick={onAddFriend}><span>추가하기</span></button>
    </AddFriend>
    <FriendList>
        {friends && friends.map((v, i)=>{
            return <li>{v.nickname}<span>({v.userId})</span>{editingMode ? <DeleteButton onClick={onRemoveFriend(v.id)}>친구삭제</DeleteButton> : <Link href={{pathname: '/user', query:{id:v.id}}} as={`/user/${v.id}`}><VisitButton>방문하기</VisitButton></Link>}</li>
        })}
    </FriendList>
  </>);
};



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

const AddFriend = styled.div`
  width: 100%;
  box-sizing: border-box;
  
  margin-bottom: 10px;
  display: flex;
  overflow: hidden;

  & button {
    background-color: ${props=>props.theme.purpleMedium};
    width: 50px;
    display: inline-block;
    border-radius: 0 20px 20px 0;
    border: 0;
    & span {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url('/static/icons/friend_add_click.svg');
        text-indent: -9999px;
        background-repeat: no-repeat;
    }
  }
  & input {
    background-color: white;
    border: 0;
    flex: 1;
    outline: 0;
    font-size: 14px;
    border-radius: 20px 0 0 20px;
    padding: 12px 20px;
    font-family: 'GmarketSansMedium';
    display: inline-block;
    color: ${props=>props.theme.purpleDark};
    &::placeholder{
      color: ${props=>props.theme.purpleMedium};
      opacity: .3;
    }
  }
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
`;
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
