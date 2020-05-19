import React, { useState, useLayoutEffect, useRef, useCallback, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from 'prop-types';
import TodoItem from "./TodoItem";
import AddTodo from './AddTodo';
import TodoStatue from './TodoStatue';
import { SAY_LOAD_TODOS, SAY_START } from '../../reducers/character';
import { H2, Date, Button } from '../styledComponents/PageComponent';
import styled from 'styled-components';
import { LOAD_LAST_TODOS_REQUEST, CLEAN_LAST_TODOS_REQUEST, LOAD_TODOS_REQUEST } from "../../reducers/todo";
import TodoCompletePopup from './TodoCompletePopup';
import { ADD_HISTORIES_REQUEST } from "../../reducers/history";
import {Animated} from 'react-animated-css';
import moment from 'moment-timezone';
moment.locale('ko');

const CheckList = memo(({id}) => {
  const dispatch = useDispatch();
  const { todos, isCleared, lastTodos, todosLoaded } = useSelector((state) => state.todo);
  const userInfo = useSelector(state=>state.user.userInfo);
  const lastStart = useSelector(state=>state.user.me && state.user.me.lastStart);
  const [started, setStarted] = useState(false);
  const [todosToCopy, setTodosToCopy] = useState([]);
  const [writingHistory, setWritingHistory] = useState(false);

  useEffect(()=>{
    if(todos.length>0 && !isCleared && !id){
      setStarted(true);
      return dispatch({
        type: SAY_LOAD_TODOS
      })
    }
    //투두 페이지 들어올때마다 started 셋팅 / 말풍선 보여주기
    if(!id && todos && todos[0] && moment(todos[0].createdAt).format('YYYY-MM-DD')!==moment().tz("Asia/Seoul").format('YYYY-MM-DD')){
      dispatch({
        type: LOAD_TODOS_REQUEST
      });
      return setStarted(false);
    }
    //날짜가 일치하지 않는다면 다시 로드하기
  }, []); 
  
  useEffect(() => {
    if(!started && todosLoaded && !todos[0] && !id){
      return dispatch({
        type: LOAD_LAST_TODOS_REQUEST,
        data: lastStart
      })
    }
  }, [todos && todos[0], todosLoaded, started, lastStart]); // 시작하지 않았다면 지난 날의 투두 데이터 가져오기

  const onStartTodo = useCallback(() => {
    setStarted(true);
    dispatch({
      type: SAY_START
    });
  }, []); //시작하기 버튼 눌렀을 때

  const onStartWithLastTodos = useCallback(()=>{
    dispatch({
      type: CLEAN_LAST_TODOS_REQUEST,
      data: {
        isCleared : lastTodos[0].HistoryId,
        lastDate : moment(lastTodos[0].createdAt).format('YYYY-MM-DD'),
        todosToCopy,
      }
    });
    setStarted(true);
    dispatch({
      type: SAY_START
    });
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

  const onClickWriteHistory = useCallback(() => {
    setWritingHistory(true);
  }, []) // 히스토리 작성모드

  const clear = useCallback((historyContent) => () => {
    dispatch({
      type: ADD_HISTORIES_REQUEST,
      data: {
        content: historyContent ? historyContent : '오늘도 힘냈다! 아자아자!',
        type: 'clearTodos'
      }
    });
    setWritingHistory(false);
  }, []); // 투두 클리어. (히스토리 내용 설정 안할 시 기본 텍스트로 히스토리 추가)


  return (
    <>
      <TodoList>
      {id ? //다른 사용자의 할일 목록 보기
        todos && todos[0] ?
            <TodoPage>
              <H2>{ isCleared && isCleared ? `${userInfo && userInfo.nickname}, 오늘의 할 일을 모두 끝냈어요!` : `${userInfo && userInfo.nickname}의 오늘의 할 일!` }</H2>
              <TodoUl>
              <UserTodoList>
                      {todos.map((c, i)=>{
                        return (
                        <Animated animationIn="fadeInUp" animationInDelay={i*100} animationInDuration={500} isVisible={true} key={i}>
                          <UserTodo checked={c.checked} onClick = {onClickAddLast(c.content)}><Checked checked={c.checked}/>{c.content}</UserTodo>
                        </Animated>
                        );
                      })}
              </UserTodoList>
              </TodoUl>
            </TodoPage>
        :  // 아무것도 없는 상태
          <StartTodo>
              <H2>{userInfo && userInfo.nickname}, 오늘의 목록을 작성하지 않았어요!</H2>
              <Illust>
                <Animated animationIn="fadeIn" animationInDuration={1000} isVisible={true} style={{height: '100%'}}><NotStartIllust/></Animated>
              </Illust>
          </StartTodo>
      : //자신의 할 일 목록
        todos && todos[0] || started ? ( //오늘의 할 일 시작하기를 눌렀거나 이미 할일이 있다면
          <> 
          {writingHistory &&
            <TodoCompletePopup clear={clear}/>
          }
            <TodoPage>
              <div>
              <H2>할 일 목록 <Date>{todos[0] && moment(todos[0].createdAt).format('YYYY년 MM월 DD일')}</Date></H2>
              </div>
              <TodoUl>
                {isCleared ? // 오늘의 투두 클리어 했다면
                  <>
                  <FinishedList>
                  <Animated animationIn="fadeIn" animationInDuration={500} isVisible={true}>
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
                  {todos.length < 15 ? <AddTodo/> : <CannotAdd>더 이상 추가할 수 없어요!</CannotAdd>}
                </>
                }
              </TodoUl>
              <TodoBottom/>
              <TodoStatue onClickWriteHistory={onClickWriteHistory} writingHistory={writingHistory}/>
            </TodoPage>
          </>
        ) : lastTodos.length>0 ? ( // 오늘의 투두를 아직 시작하지 않았을 때 지난날의 투두 조회
           <LastTodoPage>
             <H2>지난 날의 기록 <Date>{moment(lastTodos[0].createdAt).format('YYYY년 MM월 DD일')}</Date></H2>
             <H3>{lastTodos[0].HistoryId ? '성공': '실패'}의 전당</H3>
             <LastTodoList>
                  {lastTodos.map((c, i)=>{
                    return (
                      <Animated animationIn="fadeIn" animationInDelay={i*100} animationInDuration={500} isVisible={true} key={i}>
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
            <Illust>
              <Animated animationIn="fadeIn" animationInDuration={1000} isVisible={true} style={{height: '100%'}}><StartIllust/></Animated>
            </Illust>
            <StartButton onClick={onStartTodo}>시작하기</StartButton>
          </StartTodo>
        )
      }
      </TodoList>
    </>
  );
});

const TodoList = styled.div`
  background-color: ${props => props.theme.yellowLight};
  width: 100%;
  padding: 38px 15px 0 15px;
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const TodoPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height:100%;
`;

const TodoBottom = styled.div`
  height: 0;
  @media only screen and (min-height: 500px) {
    height: 100px;
  }
`;

const TodoUl = styled.ul`
  flex:1;
  overflow-y: auto;
  overflow-x: hidden;
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
      background: url('/icons/check_done.svg');
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

const Illust = styled.div`
  flex:1;
`;

const StartIllust = styled.div`
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 20px;
  text-align: center;
  background: url('/img/checklist_start_illust.png');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;
const NotStartIllust = styled(StartIllust)`
  background: url('/img/checklist_nostart_illust.png');
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
  background: ${props => props.checked ? "url('/icons/check_done.svg')": "url('/icons/check_failed.svg')" };
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

const UserTodo = styled(LastTodo)`
  cursor: default;
`;

const CopyCheck = styled(Checked)`
  background:${props=>props.checked? "url('/icons/import_todo_active.svg')" : "url('/icons/import_todo.svg')" };
  background-size: contain;
  float:right;
`;

const StartButton = styled(Button)`
  margin: 10px 0;
`;

const CannotAdd = styled.p`
  margin-top: 15px;
  text-align: center;
  color: ${props=>props.theme.purpleLight};
`;

CheckList.propTypes = {
  id: propTypes.number
}

export default CheckList;
