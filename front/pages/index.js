import React, { useState } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Shop from "../components/Shop";

const login = true;
const Index = () => {
  const [page, setPage] = useState(2);
  const goLeft = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };
  const goRight = () => {
    if (page < 3) {
      setPage((page) => page + 1);
    }
  };

  if (login) {
    return (
      <>
        <div>500별 (화폐)</div>
        <div>
          <button onClick={goLeft}>좌</button>
          <Character></Character>
          <button onClick={goRight}>우</button>
        </div>
        <div>
          {page === 1 && (
            <div>
              <History></History>
            </div>
          )}
          {page === 2 && (
            <div>
              <TodoList></TodoList>
            </div>
          )}
          {page === 3 && (
            <div>
              <Shop></Shop>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div>
        <p>로그인이 필요합니다.</p>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
    );
  }
};

export default Index;
