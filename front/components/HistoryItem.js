import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORY_REQUEST } from "../reducers/history";
import styled from 'styled-components';
import {Date} from './styledComponents/PageComponent';

const HistoryItem = ({history}) => {
    const [openDiv, setOpenDiv] = useState(false);
    const dispatch = useDispatch();
    const onClickHistoryDiv = () => {
        if(!openDiv){
            dispatch({
                type: LOAD_HISTORY_REQUEST,
                data: history.id
            });
            setOpenDiv(true);
        }else setOpenDiv(false);
  }
return (
    <>  
        <History>
        <Star open={openDiv===true}/>
            <HistoryContent onClick={onClickHistoryDiv} open={openDiv===true}>
                <Content><b>{history.content}</b></Content>
                <Date>{history.date}</Date>
                {openDiv && 
                    history.todos && 
                    <Todos>
                        {history.todos.map((v)=>{
                            return <div>{v.content}</div>
                        })}
                    </Todos>
                }
            </HistoryContent>
        </History>
  </>
  );
};

const Star = styled.span`
    width: 20px;
    height: 20px;
    background: ${props => props.open ? "url('/static/icons/listlinestarmore.svg')" : "url('/static/icons/listlinestarbasic.svg')"};
`;
const History = styled.div`
    display: flex;
`;

const HistoryContent = styled.div`
    background-color: ${props => props.open ? props.theme.purpleDark : props.theme.purpleMedium};
    padding: 20px;
    border-radius: 0 20px 20px 20px;
    flex: 1;
    margin: 10px 0 20px 20px;
    transition: all .2s ease;
    cursor: pointer;
`;

const Content = styled.div`
    color: ${props => props.theme.yellowLight};
    margin-bottom: 10px;
`;

const Todos = styled.div`
    width: 100%;
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px 0;
    transition: all .2s ease;

    & div{
        padding: 5px 10px;
        color: ${props => props.theme.purpleMedium};
    }
    & div:before{
        content: '';
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('/static/icons/listhistorystar.svg');
        background-size: contain;
        margin: -3px 10px;
    }
`;

export default HistoryItem;
