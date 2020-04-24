import React, { useState, useRef, createRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import AddTodo from './AddTodo';
import TodoStatue from './TodoStatue';
import { SAY_LOAD_TODOS } from '../reducers/character';
import { H2, Date, Button } from './styledComponents/PageComponent';
import styled from 'styled-components';
import { LOAD_LAST_TODOS_REQUEST, CLEAN_LAST_TODOS_REQUEST } from "../reducers/todo";

const CheckList = () => {
  const dispatch = useDispatch();
  const { todos, date, isCleared, lastTodos } = useSelector((state) => state.todo);
  const { me } = useSelector(state=>state.user);
  const [started, setStarted] = useState(false);
  const [todosToCopy, setTodosToCopy] = useState([]);

  useEffect(() => {
    if(todos.length>0 && !isCleared){
      return dispatch({
        type: SAY_LOAD_TODOS
      })
    }
    if(!started && todos.length===0){
      return dispatch({
        type: LOAD_LAST_TODOS_REQUEST,
        data: me && me.lastStart
      })
    }
  }, [todos, isCleared, me])

  const onStartTodo = useCallback(() => {
    setStarted(true);
  }, []);

  const onStartWithLastTodos = useCallback(()=>{
    dispatch({
      type: CLEAN_LAST_TODOS_REQUEST,
      data: {
        isCleared : lastTodos[0].HistoryId,
        date : lastTodos[0].date,
        todosToCopy,
      }
    });
    setStarted(true);
  }, [lastTodos, todosToCopy]);

  const onClickAddLast = useCallback((lastTodo) => ()=>{
    if(todosToCopy.includes(lastTodo)){
      const addListIndex = todosToCopy.indexOf(lastTodo);
      let newTodosToCopy = [...todosToCopy];
      newTodosToCopy = newTodosToCopy.filter((v, i)=> i!==addListIndex);
      setTodosToCopy(newTodosToCopy);
    }else {
      setTodosToCopy(todosToCopy.concat(lastTodo));
    }
  }, [todosToCopy]);


  return (
    <>
      
      {todos && todos[0] || started ? (
        <TodoPage>
          <div>
            <H2>할 일 목록 <Date>{date}</Date></H2>
            
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
      ) : lastTodos.length>0 ? (
         <LastTodoPage>
           <H2>지난 날의 기록 <Date>{lastTodos[0].date}</Date></H2>
           <H3>{lastTodos[0].HistoryId ? '성공': '실패'}의 전당</H3>
           <LastTodoList>
                {lastTodos.map((c, i)=>{
                  return <LastTodo checked={c.checked} onClick = {onClickAddLast(c.content)}><Checked checked={c.checked}/>{c.content}<CopyCheck checked={todosToCopy.includes(c.content)}/></LastTodo>
                })}
           </LastTodoList>
            <Button onClick={onStartWithLastTodos}>{todosToCopy.length>0 ? `${todosToCopy.length}개의 할일과 함께 시작하기`: '새로운 미션 시작하기'}</Button>
         </LastTodoPage>
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

const LastTodoPage = styled.div`
  display:flex;
  flex-direction: column;
  height: 100%;
`;
const H3 = styled.div`
  background-color: ${props=>props.theme.yellowMedium};
    padding: 10px;
    text-align: center;
    border-radius: 20px 20px 0 0;
    color: ${props=>props.theme.purpleDark};
`;

const Checked = styled.span`
  width: 30px;
  height: 30px;
  background-size: contain;
  background: ${props => props.checked ? "url('/static/icons/check_done.svg')": "url('/static/icons/check_failed.svg')" };
  text-indent: -9999px;
  display: inline-block;
  vertical-align: middle;
`;

const LastTodoList = styled.ul`
  background-color: #FFFFC4;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  border-radius: 0 0 20px 20px;
`;

const LastTodo = styled.li`
    padding: 8px 15px;
    color: ${props=>props.checked? props.theme.purpleDark:props.theme.yellowDark};
    cursor: pointer;
`;

const CopyCheck = styled(Checked)`
  background:${props=>props.checked? "url('/static/icons/import_todo_active(temp).png')" : "url('/static/icons/import_todo(temp).png')" };
  background-size: contain;
  float:right;
`;


export default CheckList;
