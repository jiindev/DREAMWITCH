import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAction,
  loadTodosAction,
  CHECK_TODO,
  checkTodoAction,
  LOAD_TODOS_REQUEST,
} from "../reducers/todo";
import TodoItem from "./TodoItem";

const CheckList = () => {
  const dispatch = useDispatch();
  const { todos, date } = useSelector((state) => state.todo);
  console.log(todos);
  useEffect(async () => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        userId: 3,
      },
    });
    const completedTodos = todos.filter((v) => v.checked === true);
    console.log("c:", completedTodos, "t:", todos);
  }, []);

  const [started, setStarted] = useState(false);
  const [adding, setAdding] = useState(false);
  const addTodoInput = useRef();

  const onStartTodo = () => {
    setStarted(true);
  };
  const AddTodoOn = useCallback(() => {
    setAdding(true);
    addTodoInput.current.focus();
  }, [addTodoInput.current]);
  const AddTodoOff = () => {
    setAdding(false);
  };
  const onCompleteTodos = () => {
    const completedTodos = todos.filter((v) => v.checked === true);
    console.log("c:", completedTodos, "t:", todos);
    if (todos.length === completedTodos.length) {
      alert("완료");
    }
  };

  return (
    <div>
      <div>
        <h2>할 일 목록</h2>
        <span>{date}</span>
      </div>
      {todos[0] || started ? (
        <div>
          <ul>
            {todos.map((c, i) => {
              return <TodoItem item={c} index={i} />;
            })}
            <input type="text" ref={addTodoInput} onBlur={AddTodoOff} />
          </ul>
          <button onClick={AddTodoOn}>+</button>
          <div>
            <button>완료</button>
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
