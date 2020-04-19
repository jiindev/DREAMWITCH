import React from "react";
import Head from "next/head";
import propTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootsaga from "../sagas";
import {ThemeProvider} from 'styled-components';
import themes from '../components/styledComponents/theme';
import GlobalStyle from '../components/styledComponents/GlobalStyle';
import Axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";

const DreamWitch = ({ Component, store, pageProps }) => (
    <>
      <Provider store={store}>
        <Head>
          <title>DreamWitch</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
        </Head>
        <ThemeProvider theme={themes}>
          <GlobalStyle></GlobalStyle>
            <Component {...pageProps}/>
          </ThemeProvider>
      </Provider>
    </>
);

DreamWitch.propTypes = {
  Component: propTypes.elementType.isRequired,
  store: propTypes.object.isRequired,
  pageProps: propTypes.object.isRequired,
};

const middleware = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

DreamWitch.getInitialProps = async (context) => {
  const {ctx, Component} = context;
  let pageProps = {};
  const state= ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if(ctx.isServer && cookie){
    Axios.defaults.headers.cookie = cookie;
  }
  if(!state.user.me){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST
    })
  }
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    (store)=>(next)=>(action)=>{
      next(action);
    }
  ];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? comspose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer &&
            window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        );
  const store = createStore(reducer, initialState, enhancer);
  store.sagaTask = sagaMiddleware.run(rootsaga);
  return store;
};

export default withRedux(configureStore)(withReduxSaga(DreamWitch));
