import React, { useCallback, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { EDIT_NICKNAME_REQUEST } from "../../reducers/user";

const EditNickname = memo(() => {
    const dispatch = useDispatch();
    const nickname = useSelector((state) => state.user.me && state.user.me.nickname);
    const [editedNickname, setEditedNickname] = useState(nickname);
    const [nicknameError, setNicknameError] = useState('');
    const onChangeNickname = useCallback((e) => {
        setEditedNickname(e.target.value);
        setNicknameError('');
    }, []);

    const onEditNickname = useCallback(() => {
        if(nickname === editedNickname) return;
        if(editedNickname.length<2){
            return setNicknameError('닉네임은 2글자 이상 설정해주세요.');
        }
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: {nickname : editedNickname}
        });
        setNicknameError('');
    }, [nickname, editedNickname]);


    return(
        <>
        <NicknameInput>
            <input type="text" placeholder='변경할 닉네임' value={editedNickname} onChange={onChangeNickname} maxLength='6'/>
            <button onClick = {onEditNickname}>변경</button>
        </NicknameInput>
        <NicknameResult>{nicknameError}</NicknameResult>
        </>
    );
});

const NicknameInput = styled.div`
    border-radius: 20px;
    width: 240px;
    margin: 0 auto;
    overflow: hidden;
    & input{
        width: 170px;
        display: inline-block;
        border: 0;
        font-size: 14px;
        padding: 10px 20px;
        box-sizing: border-box;
        outline: none;
        color: ${props => props.theme.black};
        font-family: 'GmarketSansMedium';
        &::placeholder{
            color: ${props=>props.theme.purpleMedium};
            opacity: .3;
        }
    }
    & button{
        background-color: ${props=>props.theme.purpleMedium};
        border:0;
        padding: 10px 20px;
        box-sizing: border-box;
        outline: none;
        transition: all .2s ease;
        cursor:pointer;
        color: white;
        width: 70px;
        font-family: 'GmarketSansMedium';
        font-size: 14px;
        &:hover{
            background-color: ${props=>props.theme.purpleMediumHover};
        }
    }
`;

const NicknameResult = styled.p`
    color: #e45c4a;
    font-size: 12px;
    padding-top: 10px;
`;

export default EditNickname;