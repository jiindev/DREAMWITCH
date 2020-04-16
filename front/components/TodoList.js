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
import AddTodo from './AddTodo';
import TodoStatue from './TodoStatue';
import { ADD_HISTORIES_REQUEST } from "../reducers/history";

const CheckList = () => {
  const dispatch = useDispatch();
  const { todos, date, isCleared } = useSelector((state) => state.todo);
  
  useEffect(() => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
    });
  }, []);

  const [started, setStarted] = useState(false);
  
  const onStartTodo = () => {
    setStarted(true);
  };


  return (
    <>
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
          </ul>
          <AddTodo/>
          <TodoStatue/>
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
    </>
  );
};

export default CheckList;
