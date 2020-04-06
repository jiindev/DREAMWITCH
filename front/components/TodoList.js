import React, {useState, useRef, useCallback} from 'react';

const CheckList = () => {
    const [todo, setTodo] = useState([{todo: '밥먹기', checked: false}]);
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
        alert('취소!');
    }
    const checkTodo = todoId => () => {
        console.log(todoId);
        console.log(todo[todoId]);
        const todoArray = [...todo];
        const todoTarget = todoArray[todoId];
        todoTarget.checked = true;
        setTodo(todoArray);
    }

    return(
        <div>
            {started ?
            <div>
                <ul>
                {todo.map((c, i)=>{
                    return (
                        <li>
                            <span>{c.todo}</span>
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