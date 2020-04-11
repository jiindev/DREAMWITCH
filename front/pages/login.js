import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
import Router from "next/router";
import Link from "next/link";

const Login = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggingIn, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me && me.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
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
      <h2>로그인</h2>
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
            로그인
          </button>
        </div>
        <div>
          <Link href="/signup">
            <a>
              <button>회원가입</button>
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
