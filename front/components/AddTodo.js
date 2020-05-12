import React, { useState, useRef, useCallback, useEffect, createRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO_REQUEST } from "../reducers/todo";
import styled from 'styled-components';
import {Button} from './styledComponents/PageComponent'

const AddTodo = memo(() => {
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState('');
  const addTodoInput = createRef();

  useEffect(()=>{
    if(adding){
      addTodoInput.current.focus();
    }
  }, [adding]);

  const AddTodoOn = useCallback(() => {
    setAdding(true);
  }, []);

  const AddTodoOff = useCallback(() => {
    setAdding(false);
    if(!content || !content.trim()){
      return setContent('');;
    }
    dispatch({
      type: ADD_TODO_REQUEST,
      data: {
        content
      }
    })
    setContent('');
  }, [content]);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      AddTodoOff();
    }
  }

  return (
  <>
    {adding && <AddTodoDiv><PlusIcon/><TodoContentInput type="text" ref={addTodoInput} onBlur={AddTodoOff} value={content} onChange={onChangeContent} onKeyPress={handleKeyPress}/></AddTodoDiv>}
    {!adding && <AddButton onClick={AddTodoOn}><i/></AddButton>}
  </>);
});

const AddButton = styled(Button)`
  background-color: ${props => props.theme.yellowMedium};
  outline: none;
  & i {
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('/icons/check_add.svg');
  }
`;

const AddTodoDiv = styled.div`
  display:flex;
  width: 100%;
`;

const PlusIcon = styled.span`
  width: 16px;
  height: 16px;
  margin: 7px;
  display: inline-block;
  border-radius: 20px;
  border:none;
  outline: none;
  background: url('/icons/check_add.svg');
  background-size: contain;
  vertical-align: middle;
`;

const TodoContentInput = styled.input`
  display: inline-block;
  background-color: white;
  padding: 3px 0;
  margin: 0 0 0 10px;
  font-size: 14px;
  border: 0;
  outline: none;
  color: ${props => props.checked ? props.theme.purpleMedium : props.theme.black};
  font-family: 'GmarketSansMedium';
  flex:1;
`;


export default AddTodo;
