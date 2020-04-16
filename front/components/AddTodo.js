import React, { useState, useRef, useCallback, useEffect, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";
import { ADD_TODO_REQUEST } from "../reducers/todo";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState('');
  const addTodoInput = createRef();
  const { date } = useSelector((state) => state.todo);

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
        content,
        date
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
    {adding && <input type="text" ref={addTodoInput} onBlur={AddTodoOff} value={content} onChange={onChangeContent} onKeyPress={handleKeyPress}/>}
    {!adding && <button onClick={AddTodoOn}>+</button>}
  </>);
};

export default AddTodo;
