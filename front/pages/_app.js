import React from "react";
import Head from "next/head";
import propTypes from "prop-types";
import withRedux from "next-redux-wrapper";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootsaga from "../sagas";
// import { initialState } from "../reducers/todo";
import {ThemeProvider} from 'styled-components';
import themes from '../components/styledComponents/theme';
import GlobalStyle from '../components/styledComponents/GlobalStyle';

const DreamWitch = ({ Component, store }) => {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>DreamWitch</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
        </Head>
        <ThemeProvider theme={themes}>
          <GlobalStyle></GlobalStyle>
            <Component />
          </ThemeProvider>
      </Provider>
    </>
  );
};

DreamWitch.propTypes = {
  Component: propTypes.elementType,
  store: propTypes.object,
};

const middleware = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export default withRedux((initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
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
  sagaMiddleware.run(rootsaga);
  return store;
})(DreamWitch);
