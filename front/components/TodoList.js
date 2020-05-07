import React, { useState, useRef, createRef, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from 'prop-types';
import TodoItem from "./TodoItem";
import AddTodo from './AddTodo';
import TodoStatue from './TodoStatue';
import { SAY_LOAD_TODOS } from '../reducers/character';
import { H2, Date, Button } from './styledComponents/PageComponent';
import styled from 'styled-components';
import { LOAD_LAST_TODOS_REQUEST, CLEAN_LAST_TODOS_REQUEST } from "../reducers/todo";
import TodoCompletePopup from './TodoCompletePopup';
import { ADD_HISTORIES_REQUEST } from "../reducers/history";
import {Animated} from 'react-animated-css';

const CheckList = memo(({id}) => {
  const dispatch = useDispatch();
  const { todos, isCleared, lastTodos, userTodos } = useSelector((state) => state.todo);
  const { me, userInfo } = useSelector(state=>state.user);
  const [started, setStarted] = useState(false);
  const [todosToCopy, setTodosToCopy] = useState([]);
  const [writingHistory, setWritingHistory] = useState(false);

  useEffect(()=>{
    if(todos.length>0 && !isCleared){
      return dispatch({
        type: SAY_LOAD_TODOS
      })
    }
  }, []);

  useEffect(() => {
    if(!started && todos.length===0 && !id){
      return dispatch({
        type: LOAD_LAST_TODOS_REQUEST,
        data: me && me.lastStart
      })
    }
  }, [todos, isCleared, me]); // 시작하지 않았다면 지난 날의 투두 데이터 가져오기

  const onStartTodo = useCallback(() => {
    setStarted(true);
  }, []); //시작하기 버튼 눌렀을 때

  const onStartWithLastTodos = useCallback(()=>{
    dispatch({
      type: CLEAN_LAST_TODOS_REQUEST,
      data: {
        isCleared : lastTodos[0].HistoryId,
        lastDate : lastTodos[0].createdAt.substring(0, 10),
        todosToCopy,
      }
    });
    setStarted(true);
  }, [lastTodos, todosToCopy]); // 지난 투두 확인 후 시작 (복사 기능 제공)

  const onClickAddLast = useCallback((lastTodo) => ()=>{
    if(todosToCopy.includes(lastTodo)){
      const addListIndex = todosToCopy.indexOf(lastTodo);
      let newTodosToCopy = [...todosToCopy];
      newTodosToCopy = newTodosToCopy.filter((v, i)=> i!==addListIndex);
      setTodosToCopy(newTodosToCopy);
    }else {
      setTodosToCopy(todosToCopy.concat(lastTodo));
    }
  }, [todosToCopy]); // 복사할 지난 투두 선택

  const onClickWriteHistory = () => {
    setWritingHistory(true);
  } // 히스토리에 저장모드

  const clear = useCallback((historyContent) => () => {
    dispatch({
      type: ADD_HISTORIES_REQUEST,
      data: {
        content: historyContent ? historyContent : '오늘도 힘냈다! 아자아자!',
        type: 'clearTodos'
      }
    });
    setWritingHistory(false);
  }, []); // 히스토리 내용 설정 안할 시 기본 텍스트로 히스토리 추가


  return (
    <>
      {id ? //다른 사용자의 할일 목록 보기
        <TodoPage>
          <H2>{userInfo && userInfo.nickname}의 오늘의 할 일!</H2>
          <TodoUl>
          <UserTodoList>
                  {userTodos.map((c, i)=>{
                    return (
                    <Animated animationIn="fadeInUp" animationInDelay={i*100} animationInDuration={500} isVisible={true}>
                      <LastTodo checked={c.checked} onClick = {onClickAddLast(c.content)}><Checked checked={c.checked}/>{c.content}</LastTodo>
                    </Animated>
                    );
                  })}
          </UserTodoList>
          </TodoUl>
        </TodoPage>
        : //자신의 할 일 목록
        todos && todos[0] || started ? ( //이미 오늘의 할 일을 추가했다면
          <> 
          {writingHistory &&
            <TodoCompletePopup clear={clear}/>
          }
            <TodoPage>
              <div>
              <H2>할 일 목록 <Date>{todos[0] && todos[0].createdAt.substring(0,10)}</Date></H2>
              </div>
              <TodoUl>
                {isCleared ? // 오늘의 투두 클리어 했다면
                  <>
                  <FinishedList>
                  <Animated animationIn="fadeInUp" animationInDuration={500} isVisible={true}>
                    {todos.map((c, i)=> {
                      return <li key={i}>{c.content}</li>;
                    })}
                    </Animated>
                  </FinishedList>
                  </>
                : // 아직 클리어 못했다면 (진행중인 투두리스트)
                <> 
                  {todos.map((c, i) => {
                    return <TodoItem todo={c} key={i}/>;
                  })}
                  <AddTodo/>
                </>
                }
              </TodoUl>
              <TodoBottom/>
              <TodoStatue onClickWriteHistory={onClickWriteHistory}/>
            </TodoPage>
          </>
        ) : lastTodos.length>0 ? ( // 오늘의 투두를 아직 시작하지 않았을 때 지난날의 투두 조회
           <LastTodoPage>
             <H2>지난 날의 기록 <Date>{lastTodos[0].createdAt.substring(0,10)}</Date></H2>
             <H3>{lastTodos[0].HistoryId ? '성공': '실패'}의 전당</H3>
             <LastTodoList>
                  {lastTodos.map((c, i)=>{
                    return (
                      <Animated animationIn="fadeIn" animationInDelay={i*100} animationInDuration={500} isVisible={true}>
                            <LastTodo checked={c.checked} onClick = {onClickAddLast(c.content)}><Checked checked={c.checked}/>{c.content}<CopyCheck checked={todosToCopy.includes(c.content)}/></LastTodo>
                      </Animated>
                    )
                  })}
             </LastTodoList>
              <Button onClick={onStartWithLastTodos}>{todosToCopy.length>0 ? `${todosToCopy.length}개의 할일과 함께 시작하기`: '새로운 미션 시작하기'}</Button>
           </LastTodoPage>
        ) : ( // 지난날의 기록 이미 확인했다면
          <StartTodo>
            <H2>오늘도 꿈을 향해! 할 일 목록 적어볼까?</H2>
            <Animated animationIn="bounceIn" animationInDuration={1000} isVisible={true}><StartIllust/></Animated>
            <StartButton onClick={onStartTodo}>시작하기</StartButton>
          </StartTodo>
        )
      }
      
    </>
  );
});

const TodoPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height:100%;
`;

const TodoBottom = styled.div`
  height: 120px;
`;

const TodoUl = styled.ul`
  flex:1;
  overflow: scroll;
`;

const FinishedList = styled.ul`
  & li{
    padding: 8px 15px 8px 0px;
    color: ${props=>props.theme.purpleMedium};
    &:before{
      width: 30px;
      height: 30px;
      content: '';
      background-size: contain;
      background: url('/static/icons/check_done.svg');
      display: inline-block;
      vertical-align: middle;
    }
  }
`;

const UserTodoList = styled(FinishedList)`
  & li{
    &:before{
      display:none;
    }
  }
`;

const StartIllust = styled.span`
  width: 100%;
  height: 300px;
  display: flex;
  flex: 1;
  display: inline-block;
  border-radius: 20px;
  text-align: center;
  background: url('./static/img/checklist_start_illust.png');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
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
  background:${props=>props.checked? "url('/static/icons/import_todo_active.svg')" : "url('/static/icons/import_todo.svg')" };
  background-size: contain;
  float:right;
`;

const StartButton = styled(Button)`
  margin: 0;
`;

CheckList.propTypes = {
  id: propTypes.number
}

export default CheckList;
