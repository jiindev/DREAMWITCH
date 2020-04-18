import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORY_REQUEST } from "../reducers/history";

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
        <div onClick={onClickHistoryDiv}>
            <div><b>{history.content}</b></div>
            <span>{history.date}</span>
            {openDiv && 
                history.todos && 
                    history.todos.map((v)=>{
                        return <div>{v.content}</div>
                    })
            }
                
            <br/><br/>
        </div>
  </>
  );
};

export default HistoryItem;
