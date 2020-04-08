import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTodoAction, editTodoAction } from "../reducers/todo";

const TodoItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const [editedTodo, setEditedTodo] = useState(item.content);
  const [editingMode, setEditingMode] = useState(false);
  const todoInput = useRef();

  const [inputRef, setInputRef] = useState(null);
  const liRef = useRef();

  useEffect(() => {
    if (editingMode) {
      liRef.current.childNodes[1].focus();
    }
  }, [editingMode]);

  const checkTodo = useCallback(() => {
    dispatch(checkTodoAction);
  }, []);

  const editModeStart = useCallback(() => {
    setEditingMode(true);
  }, []);

  const editTodo = useCallback((e) => {
    setEditedTodo(e.target.value);
  }, []);

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    dispatch(editTodoAction);
  }, []);

  return (
    <>
      <li ref={liRef}>
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
