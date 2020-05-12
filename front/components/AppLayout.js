import React, {memo} from "react";
import propTypes from 'prop-types';
import styled from 'styled-components';

const AppLayout = memo(({children}) => {
  return (
      <Background>
        <Logo/>
        <Frame>
            {children}
        </Frame>
        <Copyright>copyright(c) 2020 jijistudio All rights reserved.</Copyright>
      </Background>
  );
  
});
const Background = styled.div`
  background: url('/img/login_pattern.png');
  background-size: 300px 300px;
  background-position: center center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.span`
  width: 246px;
  height: 200px;
  margin: 0;
  display: none;
  background: url('/img/login_logo.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 20px;
  @media only screen and (min-width: 769px) and (min-height: 900px){
      display: block;
      margin: 10px auto 0 auto;
  }
`;

const Frame = styled.div`
  @media only screen and (min-width: 769px) {
    margin: 10px auto;
    width: 100%;
    max-width: 768px;
    height: 100%;
    max-height: 900px;
    position: relative;
    border: 10px solid ${props=>props.theme.purpleDark};
    box-sizing: border-box;
    border-radius: 25px;
    overflow: hidden;
  }
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 12px;
  color: ${props=>props.theme.purpleDark};
  margin-bottom: 10px;
  display: none;
  @media only screen and (min-width: 769px) {
    display: block;
  }
`;

AppLayout.propTypes = {
    children: propTypes.node
}


export default AppLayout;
