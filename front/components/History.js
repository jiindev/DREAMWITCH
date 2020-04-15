import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_HISTORIES_REQUEST } from "../reducers/history";

const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_HISTORIES_REQUEST
    })
  }, []);
  
  return <div>히스토리</div>;
};

export default History;
