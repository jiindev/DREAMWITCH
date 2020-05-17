import React from "react";
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
import Axios from "axios";
import { LOAD_USER_REQUEST } from "../reducers/user";
import App from 'next/app';
import {Helmet} from 'react-helmet';

class DreamWitch extends App{
  static propTypes = {
    Component: propTypes.elementType.isRequired,
    store: propTypes.object.isRequired,
    pageProps: propTypes.object.isRequired,
  };
  static async getInitialProps (context){
    const {ctx, Component} = context;
    let pageProps = {};
    const state= ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    if(ctx.isServer){
      Axios.defaults.headers.cookie = '';
    }
    if(ctx.isServer && cookie){
      Axios.defaults.headers.cookie = cookie;
    }
    if(!state.user.me){
      ctx.store.dispatch({
        type:LOAD_USER_REQUEST
      })
    }
    if(Component.getInitialProps){
      pageProps = await Component.getInitialProps(ctx) || {};
    }
    return {pageProps};
  }
  render(){
    const {Component, store, pageProps} = this.props;
    return(
      <Provider store={store}>
          <Helmet
          title="DREAMWITCH :: 꿈을 이루어줄게!"
          htmlAttributes={{lang:'ko'}}
          meta={[{
            charset: 'UTF-8'
          }, {
            name: 'viewport', content: "width=device-width, initial-scale=1,  maximum-scale=1, user-scalable=no",
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'apple-mobile-web-app-capable', content: 'yes',
          }, {
            name: 'og:title', content: 'DREAMWITCH :: 꿈을 이루어줄게!',
          }, {
            name: 'og:description', content: '꿈을 이루기 위한 할일 관리 프로젝트',
          }, {
            property: 'og:type', content: 'website',
          }, {
            property: 'og:image', content: '/thumb.jpg'
          },]}
          link={[{
            rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
          }]}
          />
          <ThemeProvider theme={themes}>
              <Component {...pageProps}/>
          </ThemeProvider>
        </Provider>
    )
  }
}

const middleware = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

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
      ? compose(applyMiddleware(...middlewares))
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
