import { ADD_FOLLOWING_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import React, { useState, useCallback, memo } from "react";
import { useDispatch } from "react-redux";

const AddFriend = memo(() => {
    const [followUserId, setfollowUserId] = useState('');
    const dispatch = useDispatch();

    const onAddFriend = useCallback(()=>{
        dispatch({
            type: ADD_FOLLOWING_REQUEST,
            data: followUserId
        })
       }, [followUserId]);
    
       const onChangeFriendId = useCallback((e)=>{
        setfollowUserId(e.target.value);
       }, [followUserId]);

    return(
        <AddFriendForm>
            <input type="text" placeholder="친구 목록에 추가할 아이디를 입력하세요" value={followUserId} onChange={onChangeFriendId}/>
            <button onClick={onAddFriend}><span>추가하기</span></button>
        </AddFriendForm>
    );
});

const AddFriendForm = styled.div`
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
export default AddFriend;