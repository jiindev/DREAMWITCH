import React, { useCallback, memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import {Animated} from 'react-animated-css';
import EditNickname from "./EditNickname";
import EditPrivate from "./EditPrivate";

const UserSetting = memo(({settingOff}) => {
    const [disappear, setDisappear] = useState(false);
    
    const onClose = useCallback(() => {
        setDisappear(true);
        setTimeout(()=>{
            settingOff();
        }, 800)
    }, []);

    return (
        <UserSettingPopup>
           <Animated animationIn="bounceInDown" animationInDuration={800} animationOut="bounceOutUp" animationOutDuration={800} isVisible={!disappear}>
            <div>
                <CloseButton onClick={onClose}/>
                <H4>나의 닉네임</H4>
                <EditNickname/>
                <H4>내 페이지 공개 여부</H4>
                <EditPrivate/>
            </div>
            </Animated>
        </UserSettingPopup>
    )
});

const UserSettingPopup = styled.div`
    position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  margin: -125px 0 0 -150px;
  &>div>div{
    background-color: ${props=>props.theme.yellowMedium};
    width: 300px;
    height: 250px;
    border-radius: 20px;
    padding-top: 20px;
    text-align: center;
    box-sizing: border-box;
  }
  
`;

const H4 = styled.h4`
    color: ${props=>props.theme.purpleDark};
    margin: 20px 0 10px 0;
    text-align: center;
    font-size: 16px;
`;

const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    background: url('/icons/comment_delete.svg');
    background-size: 30px 30px;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
`;

export default UserSetting;