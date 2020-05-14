import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST, SIGNUP_ERROR_RESET } from "../reducers/user";
import Router from "next/router";
import styled from 'styled-components';
import {Button} from '../components/styledComponents/PageComponent';
import Link from "next/link";
import {Background} from './login';

const Signup = memo(() => {
  const dispatch = useDispatch();
  const {me, signUpErrorReason } = useSelector(state=>state.user);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [greetings, setGreetings] = useState("");
  const [term, setTerm] = useState(false);
  const passwordRef = useRef();
  const nicknameRef = useRef();
  const idRef = useRef();
  const passwordCheckRef = useRef();
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [idError, setIdError] = useState('');
  const [termError, setTermError] = useState(false);

  useEffect(()=>{
    if(me){
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(()=>{
    dispatch({
      type: SIGNUP_ERROR_RESET
    })
  }, []);

  useEffect(() => {
    if(signUpErrorReason){
      setIdError(signUpErrorReason);
      idRef.current.focus();
    }
  }, [signUpErrorReason]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(!id){
      idRef.current.focus();
      return setIdError('필수 정보입니다.');
    }
    if(!nickname){
      nicknameRef.current.focus();
      return setNicknameError('필수 정보입니다.');
    }
    if(!password){
      passwordRef.current.focus();
      return setPasswordError('필수 정보입니다.');
    }
    if(!passwordCheck){
      passwordCheckRef.current.focus();
      return setPasswordCheckError(true);
    }
    if(idError) { 
      return idRef.current.focus();
    }
    if(nicknameError){
      return nicknameRef.current.focus();
    }
    if(passwordError){
      return passwordRef.current.focus();
    }
    if(passwordCheckError){
      return passwordCheckRef.current.focus();
    }
    if(!term){
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
  }, [id, nickname, password, passwordCheck, greetings, term, idError, nicknameError, passwordError, passwordCheckError]);
  const onChangeId = useCallback((e) => {
    if(!e.target.value){
      setIdError('필수 정보입니다.');
    }else if(/^[a-z0-9+]{4,10}$/.test(e.target.value)){
      setIdError('');
    }else{
      setIdError('4~10자의 영문 소문자, 숫자만 사용 가능합니다.');
    }
    setId(e.target.value);
  }, []);
  const onChangeNickname = useCallback((e) => {
    if(!e.target.value){
      setNicknameError('필수 정보입니다.');
    }else{
      setNicknameError('');
    }
    setNickname(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    if(!e.target.value){
      setPasswordError('필수 정보입니다.');
    }else if(/^[a-z0-9+]{6,16}$/.test(e.target.value)){
      setPasswordError('');
      setPasswordCheckError(e.target.value !== passwordCheck);
    }else {
      setPasswordError('6~16자의 영문 소문자, 숫자만 사용 가능합니다.');
    }
    setPassword(e.target.value);
  }, [passwordCheck]);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheckError(e.target.value !== password);
      setPasswordCheck(e.target.value);
  }, [password]);
  const onChangeGreetings = useCallback((e) => {
    setGreetings(e.target.value);
  }, [greetings]);
  const onChangeTerm = useCallback((e)=>{
    setTerm(e.target.checked);
    setTermError(false);
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
              <label htmlFor="userId">아이디 *</label>
              <input type="text" name="userId" value={id} onChange={onChangeId} maxLength='10' ref={idRef}/>
              <p>{idError}</p>
            </Input>
            <Input>
              <label htmlFor="nickname">닉네임 *</label>
              <input
                type="text"
                name="nickname"
                value={nickname}
                onChange={onChangeNickname}
                maxLength='6'
                ref={nicknameRef}
              />
              <p>{nicknameError}</p>
            </Input>
            <Input>
              <label htmlFor="userPassword">비밀번호 *</label>
              <input
                type="password"
                name="userPassword"
                value={password}
                onChange={onChangePassword}
                maxLength='16'
                ref={passwordRef}
              />
              <p>{passwordError}</p>
            </Input>
            <Input>
              <label htmlFor="userPassword">비밀번호 확인 *</label>
              <input
                type="password"
                name="userPasswordCheck"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                maxLength='16'
                ref={passwordCheckRef}
              />
              <p>{passwordCheckError && '비밀번호가 일치하지 않습니다.'}</p>
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
                maxLength='20'
              />
            </Input>
            <Term>
              <p>DREAMWITCH는 개발자 지인, 디자이너 지수로 이루어진 크리에이션 크루 지지스튜디오에서 제작한 토이 프로젝트 사이트입니다. 현재 시범 운영중으로 정식 오픈 시 데이터가 초기화될 수 있으니 유의해주세요.</p>
              <div>
                <label htmlFor="term">이에 동의합니다.</label>
                <input type="checkbox" name="term" id="term" value={term} onChange={onChangeTerm}/>
                <p>{termError && '이용약관에 동의해주세요.'}</p>
              </div>
            </Term>
            <div>
              <Button htmlFor="submit" onClick={onSubmit}>
                가입하기
              </Button>
              <Link href="/login"><a><BackButton>돌아가기</BackButton></a></Link>
            </div>
          </form>
        </Wrap>
      </Background>
  );
});


const Wrap = styled.div`
  max-width: 400px;
  padding: 30px 15px;
  box-sizing: border-box;
  margin: 0 auto;
  @media only screen and (min-width: 769px) and (min-height: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
`;

const H2 = styled.h2`
  color: ${props=>props.theme.purpleDark};
  text-align: center;
  font-size: 32px;
  margin: 20px 0;
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
  & p{
    color: #e45c4a;
    font-size: 12px;
    text-align: right;
  }
  & span{
    color:${props=>props.theme.purpleLight};
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
    & p{
      color: #e45c4a;
      font-size: 12px;
    }
  }
`;

const BackButton = styled(Button)`
  margin-top: -10px;
  background-color: ${props=>props.theme.purpleLight};
  &:hover{
    background-color: ${props=>props.theme.purpleLightHover};
  }
`;


export default Signup;
