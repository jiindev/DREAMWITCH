import React, { useEffect, useCallback, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { EDIT_NICKNAME_REQUEST, EDIT_PRIVATE_REQUEST } from "../reducers/user";

const EditPrivate = memo(({}) => {
    const currentPrivate  = useSelector((state) => state.user.me && state.user.me.private);
    const dispatch = useDispatch();
    const onChangePrivate = useCallback((privateSetting) => () => {
        if(currentPrivate === privateSetting) return;
        dispatch({
            type: EDIT_PRIVATE_REQUEST,
            data: {private: privateSetting}
        })
    }, [currentPrivate]);

    return(
        <>
        <PrivateButton onClick={onChangePrivate(false)} active={currentPrivate === false}>공개</PrivateButton>
        <PrivateButton onClick={onChangePrivate(true)} active={currentPrivate === true}>비공개</PrivateButton>
        </>
    );
});

const PrivateButton = styled.button`
    background-color: ${props=>props.active ? props.theme.purpleDark : props.theme.yellowLight};
    border: 0;
    outline: none;
    padding: 5px 10px;
    border-radius: 20px 0 0 20px;
    font-size: 14px;
    color: ${props=>props.active ? props.theme.yellowLight : props.theme.yellowDark};
    font-family: 'GmarketSansMedium';
    transition: all .2s ease;
    cursor:pointer;
    &:last-child{
        border-radius: 0 20px 20px 0;
    }
`;

export default EditPrivate;