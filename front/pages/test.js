import React, { useState, useRef, createRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "../components/TodoItem";
import AddTodo from '../components/AddTodo';
import TodoStatue from '../components/TodoStatue';
import AppLayout from "../components/AppLayout";
import { H2, Date, Button } from '../components/styledComponents/PageComponent';
import styled from 'styled-components';
import { LOAD_USER_REQUEST } from "../reducers/user";
import { LOAD_TODOS_REQUEST } from "../reducers/todo";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, isCleared } = useSelector((state) => state.todo);
  const [started, setStarted] = useState(false);

  
  const onStartTodo = useCallback(() => {
    setStarted(true);
  }, []);


  return (
    <>
      <AppLayout>
      {todos && todos[0] || started ? (
        <TodoPage>
          <div>
            <H2>할 일 목록 <Date>{todos[0] ? todos[0].createdAt.substring(0,10) : new Date().getFullYear() + "-" + ("0"+(new Date().getMonth()+1)).slice(-2) + "-" + ("0"+(new Date().getDate())).slice(-2)}</Date></H2>
            
          </div>
          <TodoUl>
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
          </TodoUl>
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
      </AppLayout>
    </>
  );
};

const TodoPage = styled.div`
  width: 100%;
`;

const TodoUl = styled.ul`
  padding-bottom: 100px;
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

TodoList.getInitialProps = async (context) => {
    context.store.dispatch({
      type: LOAD_USER_REQUEST
    })
    context.store.dispatch({
      type: LOAD_TODOS_REQUEST
    })
  }

export default TodoList;
