import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORY_REQUEST, ADD_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from "../reducers/history";
import styled from 'styled-components';
import {Date} from './styledComponents/PageComponent';
import Link from 'next/link';

const HistoryItem = ({history, userHistory}) => {
    const {me} = useSelector(state=>state.user);
    const [openDiv, setOpenDiv] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const onClickHistoryDiv = () => {
        if(!openDiv){
            dispatch({
                type: LOAD_HISTORY_REQUEST,
                data: history.id,
                userHistory
            });
            setOpenDiv(true);
        }
        else setOpenDiv(false);
    }
    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);
    const onSubmitComment = useCallback(()=>{
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                historyId: history.id,
                content: commentText,
                userHistory
            }
        });
        return setCommentText('');
    }, [me && me.id, commentText]);

    const onClickRemoveComment = useCallback(commentId => ()=>{
        dispatch({
            type: REMOVE_COMMENT_REQUEST,
            data: {commentId, historyId:history.id, userHistory },
        })
    }, []);

    return (
        <>  
            <History>
            <Star open={openDiv===true}/>
                <HistoryContent open={openDiv===true}>
                    <HistoryTitle onClick={onClickHistoryDiv}>
                        <Content><b>{history.content}</b></Content>
                        <Date>{history.date}</Date>
                    </HistoryTitle>
                    {openDiv && 
                        <>
                        {history.todos && 
                        <Todos>
                            {history.todos.map((v)=>{
                                return <div>{v.content}</div>
                            })}
                        </Todos>}
                        {history.comments && 
                        <div>
                            {history.comments.map((v)=>{
                                if(v){
                                    return (
                                        <div>
                                            {me && me.id == v.User.id ?
                                                <p>{v && v.User.nickname}</p> 
                                                : 
                                                <Link href={{pathname: '/user', query:{id:v.User.id}}} as={`/user/${v.User.id}`}><p>{v.User.nickname}</p></Link>
                                            }
                                            {v.content}
                                            {me && (history.UserId===me.id || v.UserId===me.id) && 
                                                <button onClick={onClickRemoveComment(v.id)}>삭제</button>
                                            }
                                        </div>)
                                }
                                
                            })}
                        </div>
                        }
                        <input type="text" value={commentText} onChange={onChangeCommentText}/>
                            <button onClick = {onSubmitComment}>덧글 작성</button>
                        </>
                    }
                </HistoryContent>
            </History>
        </>
  );
};

const Star = styled.span`
    width: 20px;
    height: 20px;
    background: ${props => props.open ? "url('/static/icons/listline_star_more.svg')" : "url('/static/icons/listline_star_basic.svg')"};
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
    transition: all .5s ease;
`;

const HistoryTitle = styled.div`
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
        background: url('/static/icons/list_history_star.svg');
        background-size: contain;
        margin: -3px 10px;
    }
`;

export default HistoryItem;
