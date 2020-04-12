import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Head from 'next/head';
// import AppLaout from '../components/AppLayout';
import Character from "../components/Character";
import History from "../components/History";
import TodoList from "../components/TodoList";
import Shop from "../components/Shop";
import { useSelector } from "react-redux";
import Router from "next/router";

const Index = () => {
  const { me } = useSelector((state) => state.user);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (!me) {
      Router.push("/login");
    }
  }, [me && me.id]);

  return (
    <>
      <>
        <div>500별 (화폐)</div>
        <div>
          <Character></Character>
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
    </>
  );
};

export default Index;
