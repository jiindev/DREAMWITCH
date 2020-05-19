import React, { useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORY_REQUEST, ADD_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from "../../reducers/history";
import styled from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import { SAY_LOAD_HISTORY } from "../../reducers/character";
import moment from 'moment';
moment.locale('ko');

const HistoryItem = memo(({history, lastChild}) => {
    const {me} = useSelector(state=>state.user);
    const [openDiv, setOpenDiv] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const onClickHistoryDiv = () => {
        if(!openDiv){
            dispatch({
                type: LOAD_HISTORY_REQUEST,
                data: history.id,
            });
            dispatch({
                type: SAY_LOAD_HISTORY
            })
            setOpenDiv(true);
        }
        else setOpenDiv(false);
    }
    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback(()=>{
        if(commentText){
            if(!me){
                return alert('로그인이 필요합니다.');
            }
            dispatch({
                type: ADD_COMMENT_REQUEST,
                data: {
                    historyId: history.id,
                    content: commentText,
                }
            });
            return setCommentText('');
        }
    }, [me && me.id, commentText]);

    const onClickRemoveComment = useCallback(commentId => ()=>{
        dispatch({
            type: REMOVE_COMMENT_REQUEST,
            data: {commentId, historyId:history.id},
        })
    }, []);

    return (
        <>  
            <History>
                {!lastChild &&
                    <Line/>
                }
            <Star open={openDiv===true} type={history.type}/>
                <HistoryContent open={openDiv===true} type={history.type}>
                    <HistoryTitle onClick={ history.type === 'clearTodos' ? onClickHistoryDiv : undefined} type={history.type}>
                                <Content type={history.type}>
                                    {history.type === 'levelUp' &&
                                        <><span>LEVEL UP!</span>
                                        <LevelUpIllust/></>
                                    }
                                    <p>{history.content}</p>
                                    {history.type==='clearTodos' &&
                                        <Date>{moment(history.createdAt).format('YYYY년 MM월 DD일')}</Date>
                                    }
                                </Content>
                    </HistoryTitle>
                    {openDiv && 
                        <>
                        {history.todos && 
                        <Todos>
                            {history.todos.map((v, i)=>{
                                return <div key={i}>{v.content}</div>
                            })}
                        </Todos>}
                        {history.comments && history.comments[0] &&
                        <Comments>
                            {history.comments.map((v, i)=>{
                                if(v){
                                    return (
                                        <Comment key={i}>
                                            {me && me.id == v.User.id ?
                                                <Link href='/'><a><span>{v.User.nickname}</span></a></Link>
                                                : 
                                                <Link href={{pathname: '/user', query:{id:v.User.id}}} as={`/user/${v.User.id}`}><a><span>{v.User.nickname}</span></a></Link>
                                            }
                                            <span>{moment(v.createdAt).format('YYYY.MM.DD a h:mm')}</span>
                                            {me && (history.UserId===me.id || v.UserId===me.id) && 
                                                <button onClick={onClickRemoveComment(v.id)}>삭제</button>
                                            }
                                            <p>{v.content}</p>
                                        </Comment>)
                                }
                                
                            })}
                        </Comments>
                        }
                        {me &&
                            <CommentInput>
                                <input type="text" placeholder='댓글을 입력하세요.' value={commentText} onChange={onChangeCommentText} maxLength='80'/>
                                <button onClick = {onSubmitComment}>덧글 작성</button>
                            </CommentInput>
                        }
                        </>
                    }
                </HistoryContent>
            </History>
        </>
  );
});

const Star = styled.span`
    width: 20px;
    height: 20px;
    background: ${props => props.type==='clearTodos' ? props.open ? "url('/icons/listline_star_more.svg')" : "url('/icons/listline_star_basic.svg')" : "url('/icons/listline_star_event.svg')"};
    position: relative;
    z-index: 3;
`;
const Line = styled.div`
  width: 5px;
  height: 100%;
  flex: 1;
  position: absolute;
  top: 5px;
  left: 7px;
  background-color: ${props => props.theme.yellowMedium};
  z-index: 1;
`;
const History = styled.div`
    display: flex;
    z-index: 33;
    position: relative;
`;

const HistoryContent = styled.div`
    background-color: ${props => props.type === 'clearTodos' ? props.open ? props.theme.purpleDark : props.theme.purpleMedium : props.theme.yellowMedium};
    border-radius: 0 20px 20px 20px;
    overflow: hidden;
    position: relative;
    flex: 1;
    margin: 10px 0 20px 20px;
    transition: all .5s ease;
    &:hover{
        background-color: ${props => props.type === 'clearTodos' ? props.open ? props.theme.purpleDark : props.theme.purpleMediumHover : props.theme.yellowMedium};
    }
`;

const LevelUpIllust = styled.span`
    width: 100px;
    height: 86px;
    background: url('/img/level_up.png');
    background-size: contain;
    display:block;
    position: absolute;
    bottom: -10px;
    right: 0;
`;

const HistoryTitle = styled.div`
    cursor:${props => props.type==='clearTodos' ? 'pointer' : 'initial'};
`;

const Content = styled.div`
    padding: 20px;
    & p{
        color: ${props => props.type === 'clearTodos' ? props.theme.yellowLight : props.theme.purpleDark};
        margin-bottom: 10px;
    }
    & span{
        color: ${props => props.theme.purpleMedium};
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 5px;
        display: inline-block;
    }
`;

const Date = styled.div`
    color: ${props => props.theme.purpleLight};
    font-size: 12px;
`;

const Todos = styled.div`
    box-sizing: border-box;
    background-color: white;
    border-radius: 10px;
    margin: 10px 20px 20px 20px;
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
        background: url('/icons/list_history_star.svg');
        background-size: contain;
        margin: -3px 10px;
    }
`;

const Comments = styled.ul`
    background-color: ${props => props.theme.purpleLight};
    padding: 20px;
    max-height: 180px;
    overflow-y: scroll;
`;
const Comment = styled.li`
    margin-bottom: 18px;
    &:last-child{
        margin-bottom: 0;
    }
    & span{
        color: ${props => props.theme.purpleDark};
        margin-bottom: 5px;
        display: inline-block;
        &:nth-child(2){
            font-size: 12px;
            color: ${props => props.theme.purpleMedium};
            margin-left: 5px;
        }
    }
    & p{
        color: ${props => props.theme.black};
    }
    & button{
        width: 16px;
        height: 16px;
        margin-left: 5px;
        vertical-align: middle;
        background: url('/icons/comment_delete.svg');
        background-size: contain;
        text-indent: -9999px;
        border: none;
        outline: none;
    }
`;

const CommentInput = styled.div`
    display: flex;
    & input{
        width: 100%;
        border: 0;
        font-size: 14px;
        padding: 10px 20px;
        box-sizing: border-box;
        outline: none;
        color: ${props => props.theme.black};
        font-family: 'GmarketSansMedium';
        border-radius: none;
        &::placeholder{
            color: ${props=>props.theme.purpleMedium};
            opacity: .3;
        }
    }
    & button{
        background-color: ${props=>props.theme.purpleMedium};
        border:0;
        float: right;
        text-indent: -9999px;
        outline: none;
        transition: all .2s ease;
        cursor:pointer;
        width: 50px;
        &:after{
            width: 15px;
            height: 15px;
            display: block;
            content: '';
            background: url('/icons/history_comment.svg');
            background-size: contain;
            margin: 0px auto 12px auto;
        }
        &:hover{
            background-color: ${props=>props.theme.purpleMediumHover};
        }
    }
`;

HistoryItem.propTypes = {
    history: propTypes.object.isRequired, 
    lastChild: propTypes.bool
  }
  

export default HistoryItem;
