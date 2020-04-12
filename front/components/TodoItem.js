import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  createRef,
} from "react";
import { useDispatch } from "react-redux";
import {
  CHECK_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  REMOVE_TODO_REQUEST,
} from "../reducers/todo";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [todoContent, setTodoContent] = useState(todo.content);
  const [editingMode, setEditingMode] = useState(false);
  const todoInput = createRef();
  useEffect(() => {
    if (editingMode) {
      todoInput.current.focus();
    }
  }, [editingMode]);

  const checkTodo = useCallback(() => {
    console.log("todoItem:", todo.id);
    dispatch({
      type: CHECK_TODO_REQUEST,
      data: todo.id,
    });
  }, []);

  const editModeStart = useCallback(() => {
    setTodoContent(todo.content);
    setEditingMode(true);
  }, [todo]);

  const onChangeContent = useCallback(
    (e) => {
      setTodoContent(e.target.value);
      console.log(todoContent);
    },
    [todoContent]
  );

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    console.log(todoContent);
    dispatch({
      type: EDIT_TODO_REQUEST,
      data: {
        id : todo.id,
        content: todoContent,
      },
    });
  }, [todoContent]);

  const onRemoveTodo = useCallback(() => {
    dispatch({
      type: REMOVE_TODO_REQUEST,
      data: todo.id,
    });
  }, []);

  return (
    <>
      <li>
        <button onClick={checkTodo}>
          {todo.checked ? "체크취소" : "체크"}
        </button>
        {editingMode ? (
          <>
            <input
              style={
                todo.checked
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              type="text"
              value={todoContent}
              onChange={onChangeContent}
              onBlur={editModeEnd}
              ref={todoInput}
            />
          </>
        ) : (
          <>
            <span
              style={
                todo.checked
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              onClick={editModeStart}
            >
              {todo.content}
            </span>
            <button onClick={onRemoveTodo}>삭제</button>
          </>
        )}
      </li>
    </>
  );
};

export default TodoItem;
