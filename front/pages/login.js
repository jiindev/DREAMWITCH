import React, { useState, useEffect, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST, LOGIN_ERROR_RESET } from "../reducers/user";
import Router from "next/router";
import Link from "next/link";
import styled from 'styled-components';
import {Button} from '../components/styledComponents/PageComponent';
import {Animated} from 'react-animated-css';

const Login = memo(() => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { me, logInErrorReason } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: LOGIN_ERROR_RESET
    })
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        userId: id,
        password,
      },
    });
  }, [id, password]);
  const onChangeId = useCallback((e) => {
      setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
      setPassword(e.target.value);
  }, []);

  return (
    <>
      <Background>
        <Wrap>
          <Animated animationIn="bounceInDown" animationInDuration={1200} isVisible={true}>
            <Logo/>
          </Animated>
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
                maxLength='16'
              />
            </Input>
            <ErrorReason>{logInErrorReason}</ErrorReason>
            <div>
              <Button htmlFor="submit" onClick={onSubmit}>
                로그인
              </Button>
            </div>
            <div>
              <Link href="/signup">
                <a><SignupButton>회원가입</SignupButton></a>
              </Link>
            </div>
          </form>
        </Wrap>
      </Background>
    </>
  );
});

export const Background = styled.div`
  background: url('/img/login_pattern.png');
  background-size: 300px 300px;
  background-position: center center;
  height: 100vh;
`;

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

const Logo = styled.span`
  width: 100%;
  height: 200px;
  display: inline-block;
  background: url('/img/login_logo.png');
  background-size: 296px 300px;
  background-position: center center;
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
const ErrorReason = styled.p`
    color: #e45c4a;
    font-size: 12px;
`;
const SignupButton = styled(Button)`
  background-color: ${props=>props.theme.purpleLight};
  margin-top: -10px;
  &:hover{
    background-color: ${props => props.theme.purpleLightHover};
  }
`;



export default Login;
