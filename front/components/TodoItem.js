import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  createRef,
  memo
} from "react";
import { useDispatch } from "react-redux";
import {
  CHECK_TODO_REQUEST,
  EDIT_TODO_REQUEST,
  REMOVE_TODO_REQUEST,
} from "../reducers/todo";
import styled from 'styled-components';
import propTypes from 'prop-types';

const TodoItem = memo(({ todo }) => {
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
    dispatch({
      type: CHECK_TODO_REQUEST,
      data: {
        id: todo.id,
        checked: todo.checked
      }
    });
  }, [todo.checked, todo.id]);

  const editModeStart = useCallback(() => {
    setTodoContent(todo.content);
    setEditingMode(true);
  }, [todo]);

  const onChangeContent = useCallback(
    (e) => {
      setTodoContent(e.target.value);
    },
    [todoContent]
  );

  const editModeEnd = useCallback(() => {
    setEditingMode(false);
    if(todoContent!==todo.content){
      dispatch({
        type: EDIT_TODO_REQUEST,
        data: {
          id : todo.id,
          content: todoContent,
        },
      });
    }
  }, [todoContent, todo.id, todo.content]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editModeEnd();
    }
  }

  const onRemoveTodo = useCallback(() => {
    dispatch({
      type: REMOVE_TODO_REQUEST,
      data: todo.id,
    });
  }, [todo.id]);

  return (
    <>
      <Todo>
        <CheckButton onClick={checkTodo} checked={todo.checked===true}>
          {todo.checked ? "체크취소" : "체크"}
        </CheckButton>
        {editingMode ? (
          <>
            <TodoContentEdit
              checked={todo.checked===true}
              type="text"
              value={todoContent}
              onChange={onChangeContent}
              onBlur={editModeEnd}
              onKeyPress={handleKeyPress}
              ref={todoInput}
            />
          </>
        ) : (
          <>
            <TodoContent
              checked={todo.checked===true}
              onClick={editModeStart}
            >
              {todo.content}
            </TodoContent>
            <DeleteButton onClick={onRemoveTodo}>삭제</DeleteButton>
          </>
        )}
      </Todo>
    </>
  );
});

const Todo = styled.li`
  display: flex;
  margin: 10px 0;
`;

const CheckButton = styled.button`
  width: 30px;
  height: 30px;
  background-size: contain;
  border-radius: 20px;
  border:none;
  outline: none;
  background: ${props => props.checked ? "url('/static/icons/check_checked.svg')": "url('/static/icons/check_empty.svg')" };
  text-indent: -9999px;
  cursor: pointer;
`;

const TodoContent = styled.span`
  display: inline-block;
  padding: 8px 0;
  margin: 0 0 0 10px;
  font-size: 14px;
  color: ${props => props.checked ? props.theme.purpleMedium : props.theme.black};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  flex:1;
  height: 14px;
  cursor: pointer;
`;

const TodoContentEdit = styled.input`
  display: inline-block;
  background-color: white;
  padding: 3px 0;
  margin: 0 0 0 10px;
  font-size: 14px;
  border: 0;
  outline: none;
  color: ${props => props.checked ? props.theme.purpleMedium : props.theme.black};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  font-family: 'GmarketSansMedium';
  flex:1;
`;

const DeleteButton = styled.button`
  outline: none;
  text-indent: -9999px;
  width: 14px;
  height: 14px;
  display: inline-block;
  padding: 0;
  margin: 7px 0;
  background: url('/static/icons/check_delete.svg');
  background-size: contain;
  border: 0;
  cursor: pointer;
`;

TodoItem.propTypes = {
  todo: propTypes.object.isRequired
}

export default TodoItem;
