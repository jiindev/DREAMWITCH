import React, { useState } from 'react'; 

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('')
    const onSubmit=()=>{

    }
    const onChangeId=(e)=>{
        setId(e.target.value);
    }
    const onChangePassword=(e)=>{
        setPassword(e.target.value);
    }
    return (
        <>
            <h2>로그인</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="userId">아이디</label>
                    <br/>
                    <input type="text" name="userId" value={id} onChange={onChangeId}/>
                </div>
                <div>
                    <label htmlFor="userPassword">비밀번호</label>
                    <br/>
                    <input type="password" name="userPassword" value={password} onChange={onChangePassword}/>
                </div>
            </form>
        </>
    );
}

export default Login;