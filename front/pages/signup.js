import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import Router from "next/router";
import styled from 'styled-components';
import {Button} from '../components/styledComponents/PageComponent';
import {Animated} from 'react-animated-css';
import Link from "next/link";

const Signup = memo(() => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [greetings, setGreetings] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        nickname,
        password,
        greetings
      },
    });
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeGreetings = (e) => {
    setGreetings(e.target.value);
  };
  return (
      <Background>
        <Wrap>
          <H2>JOIN US</H2>
          <form onSubmit={onSubmit}>
            <Input>
              <label htmlFor="userId">아이디</label>
              <span>* 영문/숫자 조합으로 4~10자 가능합니다.</span>
              <input type="text" name="userId" value={id} onChange={onChangeId}/>
            </Input>
            <Input>
              <label htmlFor="nickname">닉네임</label>
              <span>* 최대 10글자까지 가능합니다.</span>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
              />
            </Input>
            <Input>
              <label htmlFor="userPassword">비밀번호</label>
              <span>* 영문/숫자 조합으로 6~10자 가능합니다.</span>
              <input
                type="password"
                name="userPassword"
                value={password}
                onChange={onChangePassword}
              />
            </Input>
            <Input>
              <label htmlFor="userGreetings">인삿말</label>
              <span> 최대 20자까지 작성 가능합니다.</span>
              <input
                type="text"
                name="userGreetings"
                value={greetings}
                onChange={onChangeGreetings}
                placeholder="안녕~ 반가워!"
              />
            </Input>
            <div>
              <Button htmlFor="submit" onClick={onSubmit}>
                가입하기
              </Button>
              <Link href="/login"><BackButton>돌아가기</BackButton></Link>
            </div>
          </form>
        </Wrap>
      </Background>
  );
});

const Background = styled.div`
  background: url('/static/img/login_pattern.png');
  background-size: 300px 300px;
  background-position: center center;
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

const H2 = styled.h2`
  color: ${props=>props.theme.purpleDark};
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 900;
`;


const Input = styled.div`

  & label {
    color: ${props=>props.theme.purpleDark};
    display: inline-block;
    margin: 10px 5px;
    font-family: 'GmarketSansMedium';
    font-weight: 900;
  }
  & input {
    color: ${props=>props.theme.purpleDark};
    width: 100%;
    background: white;
    box-sizing: border-box;
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 10px 15px;
    border: 0;
    outline: 0;
    font-size: 14px;
    font-family: 'GmarketSansMedium';
    &::placeholder{
      color: ${props=>props.theme.purpleMedium};
      opacity: .3;
    }
  }
  & span{
    color: ${props=>props.theme.purpleLight};
    font-size: 12px;
  }
`;

const BackButton = styled(Button)`
  margin-top: -10px;
  background-color: ${props=>props.theme.purpleLight};
`;


export default Signup;
