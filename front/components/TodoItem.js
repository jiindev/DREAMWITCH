import React, { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { checkTodoAction, editTodoAction } from "../reducers/todo";

const TodoItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [editedTodo, setEditedTodo] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const todoInput = useRef();

  const checkTodo = useCallback(() => {
    dispatch(checkTodoAction);
  }, []);

  const editModeStart = useCallback(() => {
    console.log(todoInput);
    setEditingMode(true);
    todoInput.current.focus();
  }, [todoInput.current]);

  const editTodo = useCallback((e) => {
    setEditedTodo(e.target.value);
  }, []);

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    dispatch(editTodoAction);
  }, []);

  return (
    <>
      <li>
        <button onClick={checkTodo}>
          {item.checked ? "체크취소" : "체크"}
        </button>
        {editingMode ? (
          <>
            <input
              style={
                item.checked
                  ? { textDecorationLine: "line-through" }
                  : { textDecorationLine: "none" }
              }
              type="text"
              value={editedTodo || (item && item.content)}
              ref={todoInput}
              onChange={editTodo}
              onBlur={editModeEnd}
            />
            <button>삭제</button>
          </>
        ) : (
          <span
            style={
              item.checked
                ? { textDecorationLine: "line-through" }
                : { textDecorationLine: "none" }
            }
            onClick={editModeStart}
          >
            {item.content}
          </span>
        )}
      </li>
    </>
  );
};

export default TodoItem;
