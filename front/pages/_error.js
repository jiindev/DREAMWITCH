import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../components/styledComponents/PageComponent';
import Router from 'next/router'

const MyError = ({statusCode}) => {
    return (
        <Background>
                <Wrap>
                    <H2>{statusCode} Error</H2>
                    <ErrorIllust/>
                    <BackButton onClick={() => Router.back()}>뒤로가기</BackButton>
                </Wrap>
        </Background>
    )
}

const Background = styled.div`
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
const ErrorIllust = styled.div`
    width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 20px;
  text-align: center;
  background: url('/img/checklist_nostart_illust.png');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const H2 = styled.div`
    text-align: center;
    font-size: 32px;
    color: ${props => props.theme.purpleDark};
    line-height: 1.5;
`;

const BackButton = styled(Button)`
    max-width: 150px;
    margin: 0 auto;
`;

MyError.propTypes = {
    statusCode: propTypes.number,
};

MyError.defaultProps = {
    statusCode: 400,
};

MyError.getInitialProps = async(context) => {
    const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
    return {statusCode};
}

export default MyError;