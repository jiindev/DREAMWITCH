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
import { H2, Date, Button } from './styledComponents/PageComponent';
import styled from 'styled-components';

const CheckList = () => {
  const dispatch = useDispatch();
  const { todos, date, isCleared } = useSelector((state) => state.todo);
  const [started, setStarted] = useState(false);
  
  
  const onStartTodo = useCallback(() => {
    setStarted(true);
  }, []);


  return (
    <>
      
      {todos && todos[0] || started ? (
        <TodoPage>
          <div>
            <H2>할 일 목록 <Date>{date}</Date></H2>
            
          </div>
          <ul>
            {isCleared ? 
              todos.map((c, i)=> {
                return <li key={i}>{c.content}</li>
              })
            :
            <>
              {todos.map((c, i) => {
                return <TodoItem todo={c}/>;
              })}
              <AddTodo/>
            </>
            }
          </ul>
          <TodoStatue/>
        </TodoPage>
      ) : (
        <StartTodo>
          <div>
            <H2>오늘도 꿈을 향해! 할 일 목록 적어볼까?</H2>
          </div>
          <StartIllust>지수 일러스트</StartIllust>
          <Button onClick={onStartTodo}>시작하기</Button>
        </StartTodo>
      )}
    </>
  );
};

const TodoPage = styled.div`
  width: 100%;
`;

const StartIllust = styled.span`
  width: 100%;
  height: 300px;
  display: flex;
  flex: 1;
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
`;

const StartTodo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

export default CheckList;
