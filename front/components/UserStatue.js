import React, { useCallback, memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const UserStatue = memo(({settingOn, settingOff, settingShown}) => {
    const { me } = useSelector((state) => state.user);
    return (
        <UserStatueDiv>
            <Star>{me && me.star}</Star>
            <UserName>{me && `${me.nickname} (${me.userId})`}<SettingButton onClick={settingShown ? settingOff : settingOn}/></UserName>
            <Level>{me && me.level}</Level>
         </UserStatueDiv>
    )
});

export const UserStatueDiv = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
`;
export const Level = styled.span`
  background-color: ${props => props.theme.purpleMedium}; 
  color: #e995fc; 
  font-size: 12px;
  padding: 10px 12px;
  display: inline;
  border-radius: 0 0 0 20px;
  position: absolute;
  top: 32px;
  right: 0;
`;
export const Star = styled(Level)`
background-color: ${props => props.theme.purpleDark}; 
color: ${props => props.theme.purpleLight}; 
border-radius: 0 0 20px 0;
position: absolute;
top: 0;
left: 0;
right: auto;
  &:before{
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-right: 5px;
    background: url('/icons/top_left_star.svg');
    background-size: contain;
  }
`;
const SettingButton = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: middle;
    margin-left: 5px;
    background: url('/icons/me_setting.svg');
    background-size: contain;
    cursor: pointer;
`;
export const UserName = styled.span`
  background-color: ${props => props.theme.purpleDark}; 
  color: ${props => props.theme.purpleLight}; 
  font-size: 12px;
  padding: 10px 15px;
  display: inline-block;
  border-radius: 0 0 0 20px;
  position: absolute;
  top: 0;
  right: 0;
`;
export default UserStatue;