import { ADD_FOLLOWING_REQUEST } from "../reducers/user";
import styled from 'styled-components';
import React, { useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddFriend = memo(() => {
    const [followUserId, setfollowUserId] = useState('');
    const followings = useSelector(state=>state.user.me.Followings);
    const dispatch = useDispatch();

    const onAddFriend = useCallback(()=>{
      if(followings.find((v)=>v.userId===followUserId)){
        alert('이미 등록된 사용자입니다.');
        return setfollowUserId('');
      }
        dispatch({
            type: ADD_FOLLOWING_REQUEST,
            data: followUserId
        });
        setfollowUserId('');
    }, [followUserId, followings]);
    
       const onChangeFriendId = useCallback((e)=>{
        setfollowUserId(e.target.value);
       }, [followUserId]);

    return(
        <AddFriendForm>
            <input type="text" placeholder="동료 목록에 추가할 아이디를 입력하세요" value={followUserId} onChange={onChangeFriendId}/>
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
    outline: none;
    cursor: pointer;
    transition: all .2s ease;
    & span {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url('/icons/friend_add_click.svg');
        text-indent: -9999px;
        background-repeat: no-repeat;
    }
    &:hover{
      background-color: ${props=>props.theme.purpleMediumHover};
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