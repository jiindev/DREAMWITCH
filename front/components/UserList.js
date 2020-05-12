import React, { useState, useRef, useCallback, useEffect, memo } from "react";
import styled from 'styled-components';
import {Animated} from 'react-animated-css';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_FOLLOWING_REQUEST, ADD_FOLLOWING_REQUEST } from "../reducers/user";

const UserList = memo(({title, users, editingMode}) => {
    const dispatch = useDispatch();
    const [showList, setShowList] = useState(true);
    const { me } = useSelector(state=>state.user);

    const onToggleShow = useCallback(() => {
        setShowList(!showList)
   }, [showList]);

   const onRemoveFriend = useCallback((id) => ()=>{
    dispatch({
        type: REMOVE_FOLLOWING_REQUEST,
        data: id
    })
   }, [users]);
 
   const onAddFriend = useCallback((id) => ()=>{
     dispatch({
         type: ADD_FOLLOWING_REQUEST,
         data: id
     })
    }, []);

    return(
        <UserListDiv show={showList} rankIcon={editingMode===undefined}>
            <h3>{title}<ToggleButton onClick={onToggleShow} show={showList}/></h3>
                {users[0] ? 
                <ul>
                {users.map((v, i)=>{
                    return (
                    <Animated animationIn="fadeInUp" animationInDelay={i*100} animationInDuration={500} isVisible={true} key={i}>
                    <li>
                        <span>{i+1}</span>
                        {v.nickname}<span>({v.userId})</span>
                        {editingMode ? 
                        <DeleteButton onClick={onRemoveFriend(v.id)}>친구삭제</DeleteButton> 
                        : me && me.id !== v.id  && <Link href={{pathname: '/user', query:{id:v.id}}} as={`/user/${v.id}`}><VisitButton>방문하기</VisitButton></Link>}
                        {me && me.id !== v.id  && !(me.Followings.find(following=>following.id===v.id)) && 
                        <AddButton onClick={onAddFriend(v.userId)}>친구추가</AddButton> }
                    </li>
                    </Animated>);
                })}
                </ul>
                : 
                <NoFriend>등록한 사용자가 없습니다.</NoFriend>}
        </UserListDiv>
    );
});

const UserListDiv = styled.div`
    & span:first-child{
        display:${props=>!props.rankIcon ? 'none' : 'inline'};
        margin-right: 10px;
        color: ${props=>props.theme.purpleLight};
        font-weight: 900;
    }
    & ul {
        height: ${props=>props.show ? 'auto' : '0px'};
        overflow: hidden;
        transition: all .2s ease;
    }
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
        &:before{
            content: '';
            width: 14px;
            height: 14px;
            display: inline-block;
            background: ${props=>props.rankIcon ? "url('/static/icons/ranking_list.svg')" : "url('/static/icons/friend_list.svg')"};
            background-size: contain;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
`;

const ToggleButton = styled.button`
    float:right;
    background: url('/static/icons/list_show_toggle.svg');
    background-size: contain;
    width: 18px;
    height: 18px;
    border: none;
    outline: none;
    text-indent: -9999px;
    transform: ${props => props.show ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: all .2s ease;
    cursor: pointer;
`;

const NoFriend = styled.div`
  text-align: center;
  color: ${props => props.theme.yellowDark};
  font-size: 12px;
`;

const VisitButton = styled.span`
    float: right;
    width: 16px;
    height: 16px;
    margin-top: -2px;
    background: url('/static/icons/friend_list_house.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    vertical-align: middle;
    text-indent: -9999999px;
`;

const DeleteButton = styled(VisitButton)`
    background: url('/static/icons/friend_delete.svg');
`;

const AddButton = styled(VisitButton)`
    background: url('/static/icons/check_add.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 14px;
    height: 14px;
    margin: 0 5px 0 0;
`; 

export default UserList;