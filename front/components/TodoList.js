import React, { useState, useRef, createRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAction,
  loadTodosAction,
  CHECK_TODO,
  checkTodoAction,
  LOAD_TODOS_REQUEST,
  ADD_TODO_REQUEST,
} from "../reducers/todo";
import TodoItem from "./TodoItem";
import { ADD_HISTORIES_REQUEST } from "../reducers/history";

const CheckList = () => {
  const dispatch = useDispatch();
  const { todos, date, isCleared, clearPercentage } = useSelector((state) => state.todo);
  
  useEffect(() => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
    });
  }, []);

  const [started, setStarted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [content, setContent] = useState('');
  const [historyContent, setHistoryContent] = useState('');
  const addTodoInput = createRef();
  const historyContentInput = useRef();

  useEffect(()=>{
    if(adding){
      addTodoInput.current.focus();
    }
  }, [adding]);

  const onStartTodo = () => {
    setStarted(true);
  };
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      AddTodoOff();
    }
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onChangeHistoryContent = (e) => {
    setHistoryContent(e.target.value);
  }

  const clear = useCallback(() => {
    dispatch({
      type: ADD_HISTORIES_REQUEST,
      data: {
        date,
        content: historyContent
      }
    })
  }, [date, historyContent]);


  return (
    <div>
      <div>
        <h2>할 일 목록</h2>
        <span>{date}</span>
        {isCleared && <span>클리어!!!</span>}
      </div>
      {todos && todos[0] || started ? (
        <div>
          <ul>
            {todos.map((c, i) => {
              return <TodoItem todo={c}/>;
            })}
            {adding && <input type="text" ref={addTodoInput} onBlur={AddTodoOff} value={content} onChange={onChangeContent} onKeyPress={handleKeyPress}/>}
          </ul>
          {!adding && <button onClick={AddTodoOn}>+</button>}
          <div>
            <div>{clearPercentage}</div>
            {clearPercentage === 100 && 
              <>
                <input type="text" ref={historyContentInput} value={historyContent} onChange={onChangeHistoryContent}/>
                <button onClick={clear}>완료</button>
              </>
            }
          </div>
        </div>
      ) : (
        <div>
          <p>
            오늘도 꿈을 향해!
            <br />할 일 목록 적어볼까?
          </p>
          <button onClick={onStartTodo}>시작하기</button>
        </div>
      )}
    </div>
  );
};

export default CheckList;
