import styled from 'styled-components';
import React, { useState, useCallback, useEffect, createRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_GREETINGS_REQUEST } from '../reducers/user';
import propTypes from 'prop-types';

const TalkingBox = memo(({id}) => {
    const dispatch = useDispatch();
    const [userGreetings, setUserGreetings] = useState('');
    const [editingMode, setEditingMode] = useState(false);
    const greetingsInput = createRef();
    const { me, userInfo, page } = useSelector(state=>state.user);
    const { character } = useSelector(state=>state.character);
    
    useEffect(() => {
        if (editingMode) {
            greetingsInput.current.focus();
        }
    }, [editingMode]);

    const onChangeGreetings = useCallback(
        (e) => {
            setUserGreetings(e.target.value);
        },
        [userGreetings]
    );

    const editModeStart = useCallback(() => {
        setUserGreetings(me.greetings);
        setEditingMode(true);
    }, [me && me.greetings]);

    const editModeEnd = useCallback(() => {
        setEditingMode(false);
        if (userGreetings !== me.greetings) {
            dispatch({
                type: EDIT_GREETINGS_REQUEST,
                data: {
                    greetings: userGreetings,
                },
            });
        }
    }, [me && me.greetings, userGreetings]);
    
    return (
        <Talking>
        {!id ? 
            page === 4 ? //놀러가기 페이지에서 인삿말 수정 기능
              editingMode ? 
              <p><input type="text" value={userGreetings} onChange={onChangeGreetings} onBlur={editModeEnd} ref={greetingsInput} /></p>
              :
              <p>{me && me.greetings} <EditButton onClick={editModeStart}/></p>
            :
            character && character.talking && <p>{character.talking}</p> //기본은 각 동작에 따른 말풍선 보여줌
        :
         <p>{userInfo && userInfo.greetings}</p> //id가 있는 상태(다른 유저 페이지)일 경우 그 사람의 인삿말 보여줌
        }    
        </Talking>
    );
})

const Talking = styled.div`
  width: 100%;
  position: absolute;
  bottom: 55px;
  z-index: 10;
  & p {
    color: ${props => props.theme.purpleDark};
    margin: 0 15px;
    background-color: white;
    border-radius: 20px;
    padding: 13px 0;
    font-family: 'CookieRun-Regular';
    font-size: 12px;
  }
`;

const EditButton = styled.button`
    width: 12px;
    height: 12px;
    background: url('/static/icons/chatter_box_edit.svg');
    background-size: contain;
    border: 0;
    outline: none;
    vertical-align: middle;
    margin-left: 5px;
    cursor: pointer;
`;

TalkingBox.propTypes = {
    id: propTypes.number
}

export default TalkingBox;