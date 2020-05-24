import React, { useCallback, memo, useState } from "react";
import styled from 'styled-components';
import {Animated} from 'react-animated-css';

const Help = memo(({onClickHelp}) => {
    const [disappear, setDisappear] = useState(false);
    const [page, setPage] = useState(1);
    
    const onClose = useCallback(() => {
        setDisappear(true);
        setTimeout(()=>{
            onClickHelp();
        }, 800)
    }, []);

    const onClickArrow = (direction) => () => {
        if(direction==='prev'){
            setPage(page-1);
        }else{
            setPage(page+1);
        }
    }

    return (
        <HelpPopup>
           <Animated animationIn="bounceInDown" animationInDuration={800} animationOut="bounceOutUp" animationOutDuration={800} isVisible={!disappear}>
            <div>
            <CloseButton onClick={onClose}/>
            <H3>HOW TO</H3>
                <Image page={page}>
                    {page>1 && <Arrow className="prev" onClick={onClickArrow('prev')}/>}
                    {page<8 && <Arrow className="next" onClick={onClickArrow('next')}/>}
                </Image>
                <Navigation page={page}>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                    <li/>
                </Navigation>
            </div>
            </Animated>
        </HelpPopup>
    )
});

const HelpPopup = styled.div`
    position: absolute;
    z-index: 999;
    left: 0;
    top: 0;
    margin: 0;
  &>div>div{
    background: url('/img/login_pattern.png') ${props=>props.theme.yellowMedium};
    background-size: 300px 300px;
    background-position: center center;
    width: 100vw;
    height: 100vh;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px 0 15px;
  }
  @media only screen and (min-width: 769px) {
    left: 50%;
    top: 50%;
    margin: -265px 0 0 -238px;
    &>div>div{
        width: 476px;
        height: 530px;
        border-radius: 20px;
        background: ${props=>props.theme.yellowMedium};
    }
  }
`;

const Image = styled.span`
    width: 376px;
    height: 376px;
    max-width: 100%;
    display:inline-block;
    background: ${props=>`url('/img/help_image${props.page}.png')`};
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 20px;
    position: relative;
    margin: 0 auto 15px auto;
    @media only screen and (min-width: 769px) {
        width: 376px;
        height: 376px;
        margin: 0 50px 15px 50px;
    }
`;
const Arrow = styled.span`
    width: 32px;
    height: 32px;
    display: inline-block;
    position: absolute;
    bottom: -45px;
    cursor: pointer;
    background-size: contain;
    &.prev{
        background: url('/icons/arrow_left.svg');
        left: 0;
    }
    &.next{
        background: url('/icons/arrow_right.svg');
        right: 0;
    }
    @media only screen and (min-width: 769px) {
        top: 170px;
        bottom: none;
        &.prev{
            left: -41px;
        }
        &.next{
            right: -41px;
        }
    }
`;

const Navigation = styled.ul`
    display: flex;
    margin-bottom: 24px;
    & li{
        width: 6px;
        height: 6px;
        background-color: white;
        margin: 10px 5px;
        border-radius: 6px;
    }
    ${props=>`& li:nth-child(${props.page}){
        background-color: ${props.theme.purpleLight}
    }`}
`;

const H3 = styled.h3`
    color: ${props=>props.theme.purpleDark};
    padding: 0 0 30px 0;
    text-align: center;
    font-size: 18px;
    @media only screen and (min-width: 769px) {
        padding: 50px 0 20px 0;
    }
`;

const CloseButton = styled.button`
    width: 42px;
    height: 42px;
    background: url('/icons/comment_delete.svg');
    background-size: contain;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    @media only screen and (min-width: 769px) {
        width: 30px;
        height: 30px;
    }
`;

export default Help;