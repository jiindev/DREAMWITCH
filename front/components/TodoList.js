import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addDummyAction, loadDummyAction} from '../reducers/todo';

const CheckList = () => {
    const dispatch = useDispatch();
    const {todos, date} = useSelector(state=>state.todo);
    console.log(todos);
    useEffect(()=>{
        dispatch(loadDummyAction);
    }, []);

    const [started, setStarted] = useState(false);
    const [adding, setAdding] = useState(false);
    const addTodoInput = useRef();

    


    const onStartTodo = () => {
        setStarted(true);
    }
    const AddTodoOn = useCallback(() => {
        setAdding(true);
        addTodoInput.current.focus();
    }, [addTodoInput.current]);
    const AddTodoOff = () => {
        setAdding(false);
    }
    const checkTodo = todoIndex => () => {
        // console.log(todoIndex);
        // console.log(todo[todoIndex]);
        // const todoArray = [...todo];
        // const todoTarget = todoArray[todoIndex];
        // todoTarget.checked = true;
        // setTodo(todoArray);
    }

    return(
        <div>
            <div>
                <h2>할 일 목록</h2>
                <span>{date}</span>
            </div>
            {todos[0] || started ?
            <div>
                <ul>
                {todos.map((c, i)=>{
                    return (
                        <li>
                            <span>{c.content}</span>
                            {c.checked?<button>체크취소</button>:<button onClick={checkTodo(i)}>체크</button>}
                        </li>
                    )
                })}
                <input type="text" ref={addTodoInput} onBlur={AddTodoOff}/>
                </ul>
                <button onClick = {AddTodoOn}>+</button>
            </div>
            :
                <div>
                <p>오늘도 꿈을 향해!<br/>할 일 목록 적어볼까?</p>
                <button onClick = {onStartTodo}>시작하기</button>
                </div>
             }
        </div>
    )
}

export default CheckList;