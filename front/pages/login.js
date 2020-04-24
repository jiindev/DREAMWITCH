import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";
import Router from "next/router";
import Link from "next/link";
import styled from 'styled-components';
import {Button} from '../components/styledComponents/PageComponent';

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
      <Wrap>
        <LoginIllust></LoginIllust>
        <form onSubmit={onSubmit}>
          <Input>
            <label htmlFor="userId">ID</label>
            <input type="text" name="userId" value={id} onChange={onChangeId} />
          </Input>
          <Input>
            <label htmlFor="userPassword">PW</label>
            <input
              type="password"
              name="userPassword"
              value={password}
              onChange={onChangePassword}
            />
          </Input>
          <div>
            <Button htmlFor="submit" onClick={onSubmit}>
              로그인
            </Button>
          </div>
          <div>
            <Link href="/signup">
              <a>
                <SignupButton>회원가입</SignupButton>
              </a>
            </Link>
          </div>
        </form>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px 15px 0 15px;
  box-sizing: border-box;
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
`;

const LoginIllust = styled.span`
  width: 100%;
  height: 300px;
  display: inline-block;
  background: white;
  margin-bottom: 20px;
  border-radius: 20px;
`;

const Input = styled.div`
  width: 100%;
  background: white;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  overflow: hidden;

  & label {
    color: ${props=>props.theme.yellowDark};
    width: 40px;
    display: inline-block;
    margin-top: 4px;
    font-family: 'GmarketSansMedium';
  }
  & input {
    color: ${props=>props.theme.purpleDark};
    border: 0;
    flex: 1;
    outline: 0;
    font-size: 14px;
    font-family: 'GmarketSansMedium';
  }
`;

const SignupButton = styled(Button)`
  background-color: ${props=>props.theme.purpleLight};
  margin-top: -10px;
`;



export default Login;
