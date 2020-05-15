import React, { useEffect, useCallback, memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Animated} from 'react-animated-css';
import styled from 'styled-components';
import ClosetItem from "./ClosetItem";
import propTypes from 'prop-types';
import { SAY_HELLO } from "../reducers/character";

const UserSetting = () => {
    return (
        <UserSettingPopup>
          유저설정팝업
        </UserSettingPopup>
    )
}
const UserSettingPopup = styled.div`
  position: absolute;
  z-index:9999;
  width: 300px;
  height: 250px;
  background: red;
  left: 50%;
  top: 50%;
  margin: -125px 0 0 -125px;
`;

export default UserSetting;