import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const Signup = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        password,
      },
    });
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="userId">아이디</label>
          <br />
          <input type="text" name="userId" value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="userPassword">비밀번호</label>
          <br />
          <input
            type="password"
            name="userPassword"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <button htmlFor="submit" onClick={onSubmit}>
            가입하기
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
