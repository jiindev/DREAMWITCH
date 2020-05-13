import React, { useState, useEffect, useCallback, memo, useRef } from "react";
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
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [greetings, setGreetings] = useState("");
  const [term, setTerm] = useState(false);
  const {me} = useSelector(state=>state.user);
  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [termError, setTermError] = useState(false);
  const passwordRef = useRef();
  const nicknameRef = useRef();
  const idRef = useRef();
  const passwordCheckRef = useRef();


  useEffect(()=>{
    if(me){
      Router.push('/');
    }
  }, [me]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(!id){
      idRef.current.focus();
      return alert('아이디를 입력하세요.');
    }
    if(!nickname){
      nicknameRef.current.focus();
      return alert('닉네임을 입력하세요.')
    }
    if(!password){
      passwordRef.current.focus();
      return alert('비밀번호를 입력하세요.');
    }
    if(!passwordCheck){
      passwordCheckRef.current.focus();
      return alert('비밀번호 확인을 입력하세요.')
    }
    if (!(/^[A-Za-z0-9+]{4,10}$/.test(id))) { 
      idRef.current.focus();
      return alert('아이디는 영문/숫자만 가능합니다.');
      return setIdError(true);
    }
    if (!(/^(?!((?:[0-9]+)|(?:[a-zA-Z]+)|(?:[\[\]\^\$\.\|\?\*\+\(\)\\~`\!@#%&\-_+={}'""<>:;,\n]+))$)(.){6,16}$/.test(password))) { 
      passwordRef.current.focus();
      return alert('비밀번호는 영문/숫자 조합으로 작성해주세요.');
      return idError(true);
    }
    if(password !== passwordCheck){
      passwordCheckRef.current.focus();
      return alert('비밀번호가 일치하지 않습니다.');
      return setPasswordCheckError(true);
    }
    if(!term){
      return alert('이용약관에 동의해주세요.');
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        nickname,
        password,
        greetings
      },
    });
  }, [id, nickname, password, passwordCheck, greetings, term]);
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, [id]);
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, [nickname]);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [password]);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password, passwordCheck]);
  const onChangeGreetings = useCallback((e) => {
    setGreetings(e.target.value);
  }, [greetings]);
  const onChangeTerm = useCallback((e)=>{
    setTerm(e.target.checked);
  }, [term]);

  if(me){
    return null;
  }

  return (
      <Background>
        <Wrap>
          <H2>JOIN US</H2>
          <form onSubmit={onSubmit}>
            <Input>
              <label htmlFor="userId">아이디</label>
              <span>* 영문/숫자 4~10자 가능합니다.</span>
              <input type="text" name="userId" value={id} onChange={onChangeId} maxLength='10' ref={idRef}/>
            </Input>
            <Input>
              <label htmlFor="nickname">닉네임</label>
              <span>* 최대 6글자까지 가능합니다.</span>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
                maxLength='6'
                ref={nicknameRef}
              />
            </Input>
            <Input>
              <label htmlFor="userPassword">비밀번호</label>
              <span>* 영문/숫자 조합으로 6~16자 가능합니다.</span>
              <input
                type="password"
                name="userPassword"
                value={password}
                onChange={onChangePassword}
                maxLength='16'
                ref={passwordRef}
                style={{imeMode:'disable'}}
              />
            </Input>
            <Input>
              <label htmlFor="userPassword">비밀번호 확인</label>
              <span></span>
              <input
                type="password"
                name="userPasswordCheck"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                maxLength='16'
                ref={passwordCheckRef}
                style={{imeMode:'disable'}}
              />
            </Input>
            <Input>
              <label htmlFor="userGreetings">인삿말</label>
              <span> 최대 30자까지 작성 가능합니다.</span>
              <input
                type="text"
                name="userGreetings"
                value={greetings}
                onChange={onChangeGreetings}
                placeholder="안녕~ 반가워!"
                maxLength='30'
              />
            </Input>
            <Term>
              <p>DREAMWITCH는 개발자 지인, 디자이너 지수로 이루어진 크리에이션 크루 지지스튜디오에서 제작한 토이 프로젝트 사이트입니다. 현재 시범 운영중으로 정식 오픈 시 데이터가 초기화될 수 있으니 유의해주세요.</p>
              <div>
                <label htmlFor="term">이에 동의합니다.</label>
                <input type="checkbox" name="term" id="term" value={term} onChange={onChangeTerm}/>
              </div>
            </Term>
            
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
  background: url('/img/login_pattern.png');
  background-size: 300px 300px;
  background-position: center center;
  height: 100vh;
`;

const Wrap = styled.div`
  max-width: 400px;
  padding: 20px 15px 0 15px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const H2 = styled.h2`
  color: ${props=>props.theme.purpleDark};
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  padding-top: 30px;
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

const Term = styled.div`
  margin: 10px 0;
  padding: 10px 15px;
  line-height: 1.5;
  background: ${props=>props.theme.yellowLight};
  border-radius: 20px;
  & p{
    color: ${props=>props.theme.purpleDark};
    font-size: 12px;
  }
  & div{
    text-align: center;
    & label {
      margin-top: 10px;
      display: inline-block;
      color: ${props=>props.theme.purpleDark};
      margin: 10px 5px 10px 5px;
    }
    & input {
      width: auto;
    }
  }
`;

const BackButton = styled(Button)`
  margin-top: -10px;
  background-color: ${props=>props.theme.purpleLight};
`;


export default Signup;
