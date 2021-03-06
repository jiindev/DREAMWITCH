import styled from 'styled-components';
import React, { useState, useCallback, useEffect, createRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_GREETINGS_REQUEST } from '../../reducers/user';
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          editModeEnd();
        }
    };
    
    return (
        <Talking>
        {!id ? 
            page === 4 ? //놀러가기 페이지에서 인삿말 수정 기능
              editingMode ? //수정모드
              <p>
                  <input 
                  type="text" 
                  value={userGreetings} 
                  onChange={onChangeGreetings} 
                  onBlur={editModeEnd} 
                  onKeyPress={handleKeyPress}
                  ref={greetingsInput} 
                  maxLength='20'/>
                </p>
              :
              <p>{me && me.greetings} <EditButton onClick={editModeStart}/></p> //인삿말 보여주기(수정모드 off)
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
  bottom: 50px;
  z-index: 10;
  & p {
    color: ${props => props.theme.purpleDark};
    margin: 0 15px;
    background-color: rgba(255,255,255,.85);
    border-radius: 20px;
    height: 40px;
    font-family: 'CookieRun-Regular';
    font-size: 12px;
    line-height: 40px;
    & input {
        width: 100%;
        max-width: 300px;
        font-family: 'CookieRun-Regular';
        font-size: 12px;
        color: ${props => props.theme.purpleDark};
        text-align: center;
        border: 0;
        outline: none;
        background: transparent;
    }
  }
`;

const EditButton = styled.button`
    width: 12px;
    height: 12px;
    background: url('/icons/chatter_box_edit.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
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